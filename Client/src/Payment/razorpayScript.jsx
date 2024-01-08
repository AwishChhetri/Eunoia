export const loadRazorpayScript = (callback) => {
  const existingScript = document.getElementById("razorpay-script");

  if (!existingScript) {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.id = "razorpay-script";
    document.body.appendChild(script);

    script.onload = () => {
      if (callback && typeof callback === "function") {
        callback();
      }
    };
  } else {
    if (callback && typeof callback === "function") {
      callback();
    }
  }
};


