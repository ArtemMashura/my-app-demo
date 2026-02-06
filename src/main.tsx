import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { DndContext } from "@dnd-kit/core";

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <DndContext>
      <StrictMode>
        <App />
      </StrictMode>
    </DndContext>
  </Provider>
)
