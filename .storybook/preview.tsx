import type { Preview } from "@storybook/nextjs-vite"
import "../app/globals.css"
import "../components/FiveOclockDeco/deco.css"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="deco-root">
        <div className="container" style={{ paddingBlock: "4rem" }}>
          <Story />
        </div>
      </div>
    ),
  ],
}

export default preview
