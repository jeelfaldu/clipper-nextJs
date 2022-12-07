import Navbar from "./Navbar";

export default function Layout(props) {
  return <>
    <Navbar accessToken={props.session?.access_token}></Navbar>
    <main className="container my-5 py-3">{props.children}</main>
  </>
}