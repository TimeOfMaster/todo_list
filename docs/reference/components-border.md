# Components

This section provides an overview of the reusable components used in the ToDo List Manager.

## Border

The `Border` component is a simple wrapper that adds a styled border around its children. It is used to create a clear visual separation for different sections of the UI.

### Usage

To use the `Border` component, wrap it around any element or group of elements:

```tsx
import Border from './Border';

const App = () => (
  <Border>
    <Text>This content will be inside the border.</Text>
  </Border>
);
```
