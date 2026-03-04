export function validateCityName(city: string | undefined): string | null {
  if (!city || typeof city !== "string") {
    return "City name is required";
  }

  const trimmed = city.trim();

  if (trimmed.length === 0) {
    return "City name is required";
  }

  if (trimmed.length > 100) {
    return "City name is too long";
  }

  const validPattern = /^[a-zA-Z\s\-'.]+$/;
  if (!validPattern.test(trimmed)) {
    return "City name contains invalid characters";
  }

  return null;
}
