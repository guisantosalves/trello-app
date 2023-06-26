import Header from "@/components/Header";
import Board from "@/components/Board";

// everything inside the app is redering on the server.
export default function Home() {
  return (
    <main>
      <Header />
      <Board />
    </main>
  )
}
