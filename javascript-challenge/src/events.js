let moment = require('moment');
/** 
  An event could look like this:
  ```
  {
    id: 107,
    startsAt: '2021-01-27T13:01:11Z', 
    endsAt: '2021-01-27T15:01:11Z', 
    title: 'Daily walk',
  }
  ```
*/

const arrayOfEvents = [
  {
    id: 107,
    startsAt: '2021-01-27T13:01:11Z',
    endsAt: '2021-01-27T15:01:11Z',
    title: 'Coding challenges',
  },
  {
    id: 115,
    startsAt: '2021-01-27T11:01:11Z',
    endsAt: '2021-01-29T15:01:11Z',
    title: 'Cofference',
  },
  {
    id: 110,
    startsAt: '2021-01-27T12:01:11Z',
    endsAt: '2021-01-27T22:01:11Z',
    title: 'Playing a guitar',
  },
  {
    id: 108,
    startsAt: '2021-01-20T13:01:11Z',
    endsAt: '2021-01-23T15:01:11Z',
    title: 'Relaxing time',
  },
  {
    id: 109,
    startsAt: '2021-01-20T13:01:11Z',
    endsAt: '2021-01-23T15:01:11Z',
    title: 'Relaxing time',
  },
];

// Sorting the array of events

const sortArrayOfEvents = (events) => {
  return events.sort(
    (firstEvent, secondEvent) =>
      new Date(firstEvent.startsAt.toString()) -
      new Date(secondEvent.startsAt.toString()),
  );
};

/** 
  Take an array of events and return an object that is a  mapping from the 'day' to the events occuring on that day.
  The keys should be the day-difference to the earliest occuring event.
  Each days events should be sorted in ascending order of startsAt

  A result could look like:
  ```
  {
    0: [
      { id: 106, startsAt: '2021-01-27T13:01:11Z',  endsAt: '2021-01-27T15:01:11Z',  title: 'Daily walk' },
      { id: 156, startsAt: '2021-01-27T17:01:11Z',  endsAt: '2021-01-27T22:01:11Z',  title: 'Dinner' },
    ],
    2: [
      { id: 5676, startsAt: '2021-01-29T13:01:11Z',  endsAt: '2021-01-27T15:01:11Z',  title: 'Daily walk' },
    ]
  }
 ```

 Your solution should not modify any of the function arguments
*/
const groupEventsByDay = (events) => {
  const arrayOfEventsSorted = sortArrayOfEvents(events);
  const firstEventObj = arrayOfEventsSorted[0];

  // convert first date
  const momentOfFirstDate = moment(firstEventObj.startsAt);

  // Add a difference property to each event
  const eventsArrayWithDifference = events.map((event) => {
    const date = moment(event.startsAt);
    const dateDifference = date.diff(momentOfFirstDate, 'days');
    return {
      ...event,
      difference: dateDifference,
    };
  });

  // Grouping events according to the day differences
  events = eventsArrayWithDifference.reduce(function (allEvents, event) {
    allEvents[event.difference] = allEvents[event.difference] || [];
    allEvents[event.difference].push(event);
    return allEvents;
  }, {});

  // Mapping through the key values and remove the difference key value
  Object.keys(events).map((key) => {
    events[key] = events[key].map((event) => {
      return {
        id: event.id,
        startsAt: event.startsAt,
        endsAt: event.endsAt,
        title: event.title,
      };
    });
  });
  return events;
};

groupEventsByDay(arrayOfEvents);
/** 
  Adjust the start and end date of an event so it maintains its total duration, but is moved `toDay`.
  `eventsByDay` should be the same as the return value of `groupEventsByDay`
  `id` will be the event that should be moved
  `toDay` will be a number that indicates the key of `eventsByDay` that the target event should be moved to

  Example:
  ```
  eventsByDay(
    {
      0: [
        { id: 106, startsAt: '2021-01-27T13:01:11Z',  endsAt: '2021-01-27T15:01:11Z',  title: 'Daily walk' },      
      ],
      2: [
        { id: 5676, startsAt: '2021-01-29T13:01:11Z',  endsAt: '2021-01-29T15:01:11Z',  title: 'Daily walk' },
      ]
    },
    5676,
    3,
  )
  ```
  Should return something like 
  ```
  {
    0: [
      { id: 106, startsAt: '2021-01-27T13:01:11Z',  endsAt: '2021-01-27T15:01:11Z',  title: 'Daily walk' },      
    ],
    3: [
      { id: 5676, startsAt: '2021-01-30T13:01:11Z',  endsAt: '2021-01-30T15:01:11Z',  title: 'Daily walk' },
    ]
  },
  ```

  Your solution should not modify any of the function arguments
*/
const moveEventToDay = (eventsByDay, id, toDay) => {
  return eventsByDay;
};
