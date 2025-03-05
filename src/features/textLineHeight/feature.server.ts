import { createServerFeature } from "@payloadcms/richtext-lexical";

import type { TextLineHeightFeatureProps } from "./feature.client";

export const TextLineHeightFeature = createServerFeature<
  TextLineHeightFeatureProps,
  TextLineHeightFeatureProps,
  TextLineHeightFeatureProps
>({
  feature({ props }) {
    return {
      ClientFeature: "payload-lexical-typography/client#TextLineHeightClientFeature",
      clientFeatureProps: {
        hideAttribution: props?.hideAttribution,
        lineHeights: props?.lineHeights,
        method: props?.method,
        scroll: props?.scroll,
        customLineHeight: props?.customLineHeight,
      },
    };
  },
  key: "textLineHeight",
});
