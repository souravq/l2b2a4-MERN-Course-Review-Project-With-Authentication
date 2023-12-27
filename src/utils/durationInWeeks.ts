// Function to calculate duration in weeks and round up to the nearest integer
function calculateDurationInWeeks(startDate: string, endDate: string): number {
  const millisecondsInWeek = 7 * 24 * 60 * 60 * 1000; // milliseconds in a week

  // Convert string dates to JavaScript Date objects
  const startDateTime = new Date(startDate);
  const endDateTime = new Date(endDate);

  // Calculate duration in milliseconds
  const durationInMilliseconds =
    endDateTime.getTime() - startDateTime.getTime();

  // Calculate duration in weeks and round up to the nearest integer
  const durationInWeeks = Math.ceil(
    durationInMilliseconds / millisecondsInWeek
  );

  return durationInWeeks;
}

export default calculateDurationInWeeks;
