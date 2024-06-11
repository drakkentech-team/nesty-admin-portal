const checkProgressStatus = (status) => {
   if (status === "Open") {
      return "Open";
   } else if (status === "Pending") {
      return "In Progress";
   } else {
      return "Resolved";
   }
}

export { checkProgressStatus };