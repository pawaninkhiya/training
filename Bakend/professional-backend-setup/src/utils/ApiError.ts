class ApiError extends Error {
  statusCode: number;
  data: any;
  success: boolean;
  errors: any[];

  constructor(
    statusCode: number,
    message = "Something went wrong",
    errors: any[] = [],
    stack = ""
  ) {
    super(message); // Call base class constructor with the message

    this.statusCode = statusCode;
    this.data = null; // Initialize data (if needed)
    this.success = false; // Initialize success (if needed)
    this.errors = errors; // Initialize errors array

    // Handle stack trace
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor); // Capture stack trace
    }
  }
}

export { ApiError };


// class ApiError extends Error {
//   statusCode: number;
//   data: any;
//   success: boolean;
//   errors: any[];

//   constructor(
//     statusCode: number,
//     message = "Something went wrong",
//     errors: any[] = [],
//     stack = ""
//   ) {
//     super(message); // Call base class constructor with the message

//     this.statusCode = statusCode;
//     this.data = null; // Initialize data (if needed)
//     this.success = false; // Initialize success (if needed)
//     this.errors = errors; // Initialize errors array

//     // Handle stack trace
//     if (stack) {
//       this.stack = stack;
//     } else {
//       Error.captureStackTrace(this, this.constructor); // Capture stack trace
//     }
//   }
// }

// export { ApiError };
