let navigationRef = null;

export function setNavigationRef(ref) {
  navigationRef = ref;
}

export function navigateToLogin() {
  navigationRef?.navigate('login');
}
