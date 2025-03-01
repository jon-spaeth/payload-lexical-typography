# Payload Lexical Typography

This plugin extends the default Payload Lexical editor functionality by adding more customization options for text elements.

## Core Features 🧩

- **Text color** - ability to change text color to predefined colors or selected color using color picker.
- **Font size** (coming very soon)
- **Font family** (coming soon)
- **Line height** (coming soon)

## Installation 📦

To get plugin up and running, follow these steps:

1. **Install package from NPM:**

   ```bash
   pnpm add payload-lexical-typography
   # OR
   npm install payload-lexical-typography
   ```

2. **Add features you want to include in your lexical editor config, you can also pass additional props:**

   ```ts
   import { lexicalEditor } from "@payloadcms/richtext-lexical";
   import { TextColorFeature, TextSizeFeature } from "payload-lexical-typography";

   lexicalEditor({
     features: () => {
       return [
         TextColorFeature({
           colors: ["#FFFFFF", "#000000", "#FF0000", "#00FF00", "#0000FF"],
         }),
         TextSizeFeature(),
       ];
     },
   });
   ```

3. **Add converters to your RichText component**

   ⚠️ Warning: Starting from version **0.1.0**, converters **must** be imported from the `/converters` submodule instead of `/client`.

   ### JSX Converters

   ```tsx
   import { TypographyJSXConverters } from "payload-lexical-typography/converters";

   const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
     ...defaultConverters,
     ...TypographyJSXConverters,
   });
   ```

   ### HTML Converters

   For HTML converter, use `TypographyHTMLConverters` instead of `TypographyJSXConverters`, from `/converters` submodule.

## Configuration 🛠

### TextColorFeature

- **colors** - Array of colors that will be available in the color picker predefined section.

### TextSizeFeature

- **sizes** - Array of font sizes that will be available in the font size dropdown as preset values.

## License 📜

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing 🤝

If you have any ideas on how this plugin can be improved, please feel free to open an issue or a pull request.

## Contact 📧

If you have any questions, feel free to reach out to me at [adrianmaj1122@gmail.com](mailto:adrianmaj1122@gmail.com), or on my Linkedin profile [Adrian Maj](https://www.linkedin.com/in/adrianmaj/).

## Support the Project ❤️

If you find this plugin useful, you can support the project by giving it a ⭐️, or [buying me a coffee ☕️](https://buymeacoffee.com/adrianmaj), for motivation to keep working on it. Thanks for your support!
