import Accordion from "react-bootstrap/Accordion";

function AllCollapseExample() {
  return (
    <Accordion className="accordingForm" style={{ display: "grid", gap: 20 }}>
      <Accordion.Item eventKey="0">
        <Accordion.Header >What is NectroCinema</Accordion.Header>
        <Accordion.Body
          style={{ backgroundColor: "black", color: "wheat", fontSize: 23 }}
        >
          NectroCinema is a streaming service that offers a wide variety of
          award-winning TV shows, movies, anime, documentaries and more – on
          thousands of internet-connected devices. You can watch as much as you
          want, whenever you want, without a single ad – all for one low monthly
          price. There always something new to discover, and new TV shows and
          movies are added every week!
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Is NectroCinema is Good for Kids?</Accordion.Header>
        <Accordion.Body
          style={{ backgroundColor: "black", color: "wheat", fontSize: 23 }}
        >
          The NectroCinema Kids experience is included in your membership to
          give parents control while kids enjoy family-friendly TV shows and
          films in their own space. Kids profiles come with PIN-protected
          parental controls that let you restrict the maturity rating of content
          kids can watch and block specific titles you don’t want kids to see.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Where can I Watch?</Accordion.Header>
        <Accordion.Body
          style={{ backgroundColor: "black", color: "wheat", fontSize: 23 }}
        >
          Watch anywhere, anytime. Sign in with your NectroCinema account to
          watch instantly on the web at NectroCinema.com from your personal
          computer or on any internet-connected device that offers the
          NectroCinema app, including smart TVs, smartphones, tablets, streaming
          media players and game consoles. You can also download your favourite
          shows with the iOS, Android, or Windows 10 app. Use downloads to watch
          while you are on the go and without an internet connection. Take
          NectroCinema with you anywhere.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3" >
        <Accordion.Header>What can I watch on NectroCinema</Accordion.Header>
        <Accordion.Body
          style={{ backgroundColor: "black", color: "wheat", fontSize: 23 }}
        >
          Netflix has an extensive library of feature films, documentaries, TV
          shows, anime, award-winning Netflix originals, and more. Watch as much
          as you want, anytime you want.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AllCollapseExample;
