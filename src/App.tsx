import { AuthProvider } from "./context/auth.context.tsx";
import { CartProvider } from "./context/cart.context.tsx";
import { ChatProvider } from "./context/chat.context.tsx";
import { ProductProvider } from "./context/products.context.tsx";
import { UtilsProvider } from "./context/utils.context.tsx";
import "./hooks/useLazyLoading.tsx";
import { AppRouter } from "./routes/index.tsx";

function App() {
  return (
    <CartProvider>
      <ChatProvider>
        <AuthProvider>
          <ProductProvider>
            <UtilsProvider>
              <AppRouter></AppRouter>
            </UtilsProvider>
          </ProductProvider>
        </AuthProvider>
      </ChatProvider>
    </CartProvider>
  );
}

export default App;
