import Header from "@/components/Header";

// everything inside the app is redering on the server.
export default function Home() {
  return (
    <main>
      {/* header */}
      <Header />
      {/* body */}
      <h1>trello clone lets goo</h1>
    </main>
  )
}
