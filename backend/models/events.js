const mongoose = require('mongoose');

/**
 * Mongoose schema for representing events.
 * @typedef {Object} EventSchema
 * @property {String} eventId - The unique identifier for the event.
 * @property {String} eventName - The name of the event.
 * @property {String} [eventDescription] - The description of the event.
 * @property {Date} eventDate - The date and time of the event.
 * @property {Number} eventDuration - The duration of the event in minutes.
 * @property {Boolean} [eventIsActive=true] - Indicates whether the event is active or not.
 * @property {String} [eventImage=""] - The URL or path to the event's image.
 * @property {Number} [eventCapacity=1000] - The maximum capacity of the event.
 * @property {Array<String>} [eventCategoriesList] - An array of category IDs associated with the event.
 * @property {Array<ObjectId>} [categoryList] - An array of category references (ObjectIds) associated with the event.
 */


const eventSchema = new mongoose.Schema({
  eventId: {
    type: String,
    default: function () {
      const randomChars1 = generateRandomChars(2);
      const randomDigits = generateRandomNumber(1000, 9999);
      return `E${randomChars1}-${randomDigits}`;
    },
  },
  eventName:  {
    type: String,
    required: [true, 'Event Name is required.'],
    validate: {
        // This function receives the value v of the categoryName that's being set or updated in a Category document.
        validator: function (v) {
            /*^[a-z0-9]+$: This regular expression matches strings that:
            Start (^) and end ($) without any extra characters.
            Are composed entirely of alphabetic characters (a-z) or numerals (0-9).
            The + ensures that there's at least one character.

            /i: This flag makes the regular expression match case-insensitive, 
            allowing for both uppercase and lowercase characters.

            */
            return /^[a-z0-9]+$/i.test(v); // Ensure alphanumeric
        },
        message: props => `${props.value} is not a valid event name! It must be alphanumeric.`
    }
},
  eventDescription: {
    type: String,
  },
  eventDate: {
    type: Date,
    required: [true, 'Event Date is required.'],
  },
  eventDuration: {
    type: Number,
    required: [true, 'Event Duration is required.'],
  },
  eventIsActive: {
    type: Boolean,
    default: true,
  },
  eventImage: {
    type: String,
    default: "", // NEED TO ADD DEFAULT IMAGE
  },
  eventCapacity: {
    type: Number,
    default: 1000,
    validate: {
      validator: function (value) {
        return value >= 10 && value <= 2000;
      },
      message: props => `${props.value} Capacity must be between 10 and 2000 (inclusive).`

    },
  },
  eventTicketQty: {
    type: Number,
    default: function () {
      return this.eventCapacity; // Set eventTicketQty default to eventCapacity value
    },
  },
  eventCategories: {
    type: String,
    // required: [true, 'Event Category ID is required.'],
  },
  eventCategoriesList: {
    type: [String],
  },
  // Field eventsList that is an array of ObjectIds that will reference events
  categoryList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories'
  }]
});

/**
 * Utility function for generating random characters.
 * @function
 * @param {Number} length - The length of the random character string.
 * @returns {String} - The generated random character string.
 */

function generateRandomChars(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

/**
 * Utility function for generating random numbers within a specified range.
 * @function
 * @param {Number} min - The minimum value of the random number (inclusive).
 * @param {Number} max - The maximum value of the random number (inclusive).
 * @returns {Number} - The generated random number.
 */

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Mongoose model for representing events.
 * @type {Event}
 */
const Event = mongoose.model('events', eventSchema);
module.exports = Event;