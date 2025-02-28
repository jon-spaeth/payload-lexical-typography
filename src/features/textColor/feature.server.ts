import { createServerFeature } from "@payloadcms/richtext-lexical";

import { type TextColorFeatureProps } from "./feature.client";

export const TextColorFeature = createServerFeature<
  TextColorFeatureProps,
  TextColorFeatureProps,
  TextColorFeatureProps
>({
  feature({ props }) {
    return {
      ClientFeature: "payload-lexical-typography/client#TextColorClientFeature",
      clientFeatureProps: {
        colors: props?.colors || [],
      },
    };
  },
  key: "textColor",
});
