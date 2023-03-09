import React, { useEffect, useState, useRef } from "react";
import Card from "./Card";
import axios from "axios";

const API = "http://deckofcardsapi.com/api/deck";
function Deck() {
  const [deck, setDeck] = useState(null);
  const [cardDrawn, setCardDrawn] = useState([]);
  const [auto, setAuto] = useState(false);
  const timer = useRef(null);
  useEffect(() => {
    async function getData() {
      let deckData = await axios.get(`${API}/new/shuffle/`);
      setDeck(deckData.data);
    }
    getData();
  }, [setDeck]);

  useEffect(() => {
    async function getCard() {
      let { deckID } = deck;

      try {
        let response = await axios.get(`${API}/${deckID}}/draw/`);

        if (response.data.remaining === 0) {
          setAuto(false);
          throw new Error("no cards left in deck!");
        }

        const card = response.data.cards[0];

        setCardDrawn(deckData => [
          ...deckData,
          {
            id: card.code,
            name: card.suit + " " + card.value,
            image: card.image
          }
        ]);
      } catch (err) {
        alert(err);
      }
    }

    if (auto && !timer.current) {
      timer.current = setInterval(async () => {
        await getCard();
      }, 1000);
    }

    return () => {
      clearInterval(timer.current);
      timer.current = null;
    };
  }, [auto, setAuto, deck]);

  const cards = cardDrawn.map(c => (
    <Card key={c.id} name={c.name} image={c.image} />
  ));

  const toggleAutoDraw = () => {
    setAuto(auto => !auto);
  };

  return (
    <div className="Deck">
      {deck ? (
        <button className="Deck-draw" onClick={toggleAutoDraw}>
          {auto ? "STOP" : "KEEP"} DRAWING CARDS
        </button>
      ) : null}
      <div className="Deck-cards">{cards}</div>
    </div>
  );
}

export default Deck;