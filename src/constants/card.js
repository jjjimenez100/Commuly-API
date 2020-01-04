const CHART_TYPES = Object.freeze([
  'bar', 'pie', 'line',
]);

const CONTENT_TYPES = Object.freeze([
  'chartContent', 'imageURLContent', 'videoURLContent', 'serialTableContent', 'assignmentContent', 'scheduledEventContent',
]);

const REACTIONS = Object.freeze([
  'understood', 'excited', 'bored', 'confused',
]);

module.exports = {
  CHART_TYPES,
  CONTENT_TYPES,
  REACTIONS,
};
