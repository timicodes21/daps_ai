export const sliceText = (
  maxLength: number | "infinite",
  text: string
): string => {
  // pass inifite if you want to display all
  if (maxLength === "infinite") {
    return text;
  }
  return text.slice(0, maxLength) + (text.length > maxLength ? "..." : "");
};
