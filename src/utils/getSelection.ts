import { $getSelection, $isRangeSelection } from "@payloadcms/richtext-lexical/lexical";

export const getSelection = (selection = $getSelection()) => {
  if ($isRangeSelection(selection)) {
    return selection;
  }
  return null;
};
