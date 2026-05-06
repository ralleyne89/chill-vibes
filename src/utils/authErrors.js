export const getAuthErrorMessage = (error, fallbackAction) => {
  switch (error?.code) {
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return "Google sign-in was cancelled before it finished.";
    case "auth/popup-blocked":
      return "Your browser blocked the Google popup. Try again and allow popups, or use the redirect that starts automatically.";
    case "auth/account-exists-with-different-credential":
      return "An account already exists with that email. Sign in with the original method first, then connect Google.";
    case "auth/email-already-in-use":
      return "An account already exists with that email. Try logging in instead.";
    case "auth/invalid-email":
      return "Enter a valid email address.";
    case "auth/user-disabled":
      return "This account has been disabled in Firebase.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "The email or password is incorrect.";
    case "auth/weak-password":
      return "Use a stronger password with at least 6 characters.";
    case "auth/operation-not-allowed":
      return "This sign-in method is not enabled for this Firebase project.";
    case "auth/unauthorized-domain":
      return "This domain is not authorized for Firebase Authentication. Add localhost in the Firebase Authentication settings.";
    case "auth/network-request-failed":
      return "Google sign-in could not reach Firebase. Check your connection and try again.";
    default:
      return `${fallbackAction}: ${error?.message || "Please try again."}`;
  }
};
