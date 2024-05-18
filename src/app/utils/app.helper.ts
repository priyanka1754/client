export class AppHelper {

  public static getNextSundayDate() {
    // Get today's date
    const today = new Date();

    // Find the next Sunday
    while (today.getDay() !== 0) {
      // Increment the date by one day
      today.setDate(today.getDate() + 1);
    }

    // Output the date of the next Sunday

    return today.toDateString();

  }

  public static getFormattedDate(date: Date) {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    })
  }

  public static getParticularDateFromTodayByDays(days: number) {
    // Create a new Date object for today
    var today = new Date();

    // Add 15 days to today's date
    today.setDate(today.getDate() + days);

    // Extract the year, month, and day separately
    var year = today.getFullYear();
    var month = today.getMonth() + 1; // Month is zero-based, so we add 1
    var day = today.getDate();

    // Format the result as a string (optional)
    var formattedDate = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;

    return formattedDate;
  }

  public static validatePassword(password: any) {
    // Regular expression for password validation
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$&#])[A-Za-z\d@$#&]{8,}$/;
    return regex.test(password);
  }

  public static validatePhoneNumber(phone: number) {
    // Regular expression for Indian phone numbers
    const regex = /^[6-9]\d{9}$/;
    return !!phone && regex.test(phone.toString());
  }

  public static validatePincode(pincode: number) {
    // Indian PIN code regex pattern
    const regex = /^[1-9][0-9]{5}$/;
    return !!pincode && regex.test(pincode.toString());
  }

  public static validateLink(link: string) {
    // Regular expression to match URLs
    var urlRegex = /(https?:\/\/[^\s]+)/;

    // Test if the link matches the URL regex
    return urlRegex.test(link);
  }

  // Function to stringify and save item to localStorage
  public static saveToLocalStorage(key: any, value: any) {
    try {
      if (value) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error('Error saving item to localStorage:', error);
    }
  }

  // Function to parse item from localStorage
  public static getFromLocalStorage(key: string) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error retrieving item from localStorage:', error);
      return null;
    }
  }


}
