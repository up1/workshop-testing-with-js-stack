import { ref } from 'vue';

export function useFormError() {
  const error = ref('');
  const showError = ref(false);

  const setError = (message: string) => {
    error.value = message;
    showError.value = true;
  };

  const clearError = () => {
    error.value = '';
    showError.value = false;
  };

  return {
    error,
    showError,
    setError,
    clearError
  };
}