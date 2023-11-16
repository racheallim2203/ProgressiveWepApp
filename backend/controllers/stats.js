const statsOperation = require("../models/operation");

/**
 * Controller module for handling total counts of events and categories.
 * @namespace StatsController
 */


module.exports = {

    /**
     * Fetch and render the total counts of events and categories.
     * @async
     * @function
     * @memberof StatsController
     * @param {express.Request} req - Express request object.
     * @param {express.Response} res - Express response object.
     * @returns {void}
     */

    totalCounts: async function(req, res) {
        try {

          /**
             * Object representing the total counts and statistics.
             * @typedef {object} TotalCounts
             * @property {number} eventCount - The total count of events.
             * @property {number} categoryCount - The total count of categories.
             * @property {number} createdCount - The count of created entities.
             * @property {number} deletedCount - The count of deleted entities.
             * @property {number} updateCount - The count of updated entities.
             */

            /**
             * Get the total counts and statistics.
             * @async
             * @function
             * @memberof StatsOperation
             * @returns {TotalCounts} The total counts and statistics.
             */
            
          const { eventCount, categoryCount, createdCount, deletedCount, updateCount } = await statsOperation.getStats();
          res.json({ eventCount, categoryCount, createdCount, deletedCount, updateCount });
          
        } catch (error) {
          console.error("Failed to fetch counts", error);
          res.status(500).send("Internal Server Error");
        }
      }

}