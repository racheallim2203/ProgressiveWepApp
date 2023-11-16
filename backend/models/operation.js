const Event = require("./events"); 
const eventCategory = require("./eventCategory"); 
const mongoose = require('mongoose');

/**
 * Represents a counter in the database.
 * @typedef {Object} Counter
 * @property {string} type - The type of the counter.
 * @property {number} count - The count associated with the counter.
 */


const counterSchema = new mongoose.Schema({
  type: {
      type: String,
      default: ''
  },
  count: {
      type: Number,
      default: 0
  }
});


/**
 * Counter model for interacting with counters in the database.
 * @type {mongoose.Model<Counter>}
 */
const Counter = mongoose.model('Counter', counterSchema);

/**
 * Initializes counters if they don't exist in the database.
 * @async
 * @function
 * @throws {Error} Throws an error if initialization fails.
 */

// Initialize counters if they don't exist
async function initializeCounters() {
  try {
      await Counter.findOneAndUpdate({ type: 'addCount' }, { $setOnInsert: { type: 'addCount', count: 0 } }, { upsert: true });
      await Counter.findOneAndUpdate({ type: 'createdCount' }, { $setOnInsert: { type: 'createdCount', count: 0 } }, { upsert: true });
      await Counter.findOneAndUpdate({ type: 'deletedCount' }, { $setOnInsert: { type: 'deletedCount', count: 0 } }, { upsert: true });
      await Counter.findOneAndUpdate({ type: 'updateCount' }, { $setOnInsert: { type: 'updateCount', count: 0 } }, { upsert: true });

  } catch (err) {
      console.error('Error initializing counters:', err);
  }
}

/**
 * Fetches total counts of events and categories from the database.
 * @async
 * @function
 * @throws {Error} Throws an error if fetching counts fails.
 * @returns {Object} An object containing total counts and statistics.
 * @property {number} eventCount - The total count of events.
 * @property {number} categoryCount - The total count of categories.
 * @property {number} addCount - The count of added entities.
 * @property {number} createdCount - The count of created entities.
 * @property {number} deletedCount - The count of deleted entities.
 * @property {number} updateCount - The count of updated entities.
 */


// Function to fetch total counts of events and categories
async function getStats() {
  try {
      const eventCount = await Event.countDocuments({});
      const categoryCount = await eventCategory.countDocuments({});
      const addCount = await Counter.findOne({ type: 'addCount' });
      const createdCount = await Counter.findOne({ type: 'createdCount' });
      const deletedCount = await Counter.findOne({ type: 'deletedCount' });
      const updateCount = await Counter.findOne({ type: 'updateCount' });
      return {
          eventCount,
          categoryCount,
          addCount: addCount.count,
          createdCount: createdCount.count,
          deletedCount: deletedCount.count,
          updateCount: updateCount.count
      };

  } catch (error) {
      throw error;
  }
}

// Call the initialization function before using the counters
initializeCounters();

/**
 * Increments the addCount and createdCount in the Counter model.
 * @async
 * @function
 * @throws {Error} Throws an error if incrementing counts fails.
 */

// Function to increment the addCount in the Counter model
async function incrementAddCount() {
    try {
      // Increment the addCount by 1
      await Counter.findOneAndUpdate({type: 'addCount'}, { $inc: { count: 1 } });
      await Counter.findOneAndUpdate({type: 'createdCount'}, { $inc: { count: 1 } });
    } catch (error) {
      throw error;
    }
  }

  /**
 * Increments the deleteCount and deletedCount in the Counter model.
 * @async
 * @function
 * @throws {Error} Throws an error if incrementing counts fails.
 */

// Function to increment the deleteCount in the Counter model
async function incrementDeleteCount() {
    try {
      // Increment the deleteCount by 1
      await Counter.findOneAndUpdate({type: 'deletedCount'}, { $inc: { count: 1 } });
    } catch (error) {
      throw error;
    }
  }

  /**
 * Increments the updateCount in the Counter model.
 * @async
 * @function
 * @throws {Error} Throws an error if incrementing counts fails.
 */

  // Function to increment the deleteCount in the Counter model
async function incrementUpdateCount() {
  try {
    // Increment the deleteCount by 1
    await Counter.findOneAndUpdate({type: 'updateCount'}, { $inc: { count: 1 } });
  } catch (error) {
    throw error;
  }
}

/**
 * Module exports.
 * @module StatsOperation
 */

module.exports = {
  getStats,
  incrementAddCount,
  incrementDeleteCount,
  incrementUpdateCount,
  Counter,
};