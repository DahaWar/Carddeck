let finnkort = [];
var e;
let valg;

function settkort() {
    let AmountFlip = 0;
    let board = document.querySelector("#cardboard");
    const choices = ['5spade.png', '7claws.png', '2hearts.png', '3claws.png', '4heart.png', 'kingheart.png', 'queenquad.png', 'essspade.png']
    let imglist = [...choices, ...choices]; //spread array in one array (...)
    board.innerHTML = "";

    arrayShuffle(imglist); //comment out for unshuffle 

   
    var antall = new Vue({
        el: "#amount-flip",

        data: {
            AmountFlip: 0
        }
    });
    for (let i = 0; i < 16; i++) {
        //for every 16 cards 

        let card = document.createElement("div");
        //https://stackoverflow.com/questions/34950867/vue-js-how-to-set-a-unique-id-for-each-component-instance
        var new_cards = new Vue({
            template: `
            <div class="cardboard">
                <div class="outer" v-on:click="flip($event)">
                    <div class="card front" v-bind:style="{ transform:flipped ? 'rotateZ(1080deg)': 'none', display: removed ? 'none': ''}">
                        <img :src="img">
                    </div>
                    <div class="card back" v-bind:style="{ transform : flipped? 'rotateY(-180deg)': 'none', display : removed ? 'none':''}"></div>
                </div>
            </div>
            `,
            data: function() {
                return {
                    id: i,
                    img: imglist[i],
                    flipped: false,
                    matched: false,
                    removed: false

                };

            },

            methods: {
                flip: function(o) {
                    if (valg === undefined) {
                        this.flipped = true;
                        valg = this;
                    } else {
                        if (valg.id == this.id) { // Hvis bruker trykker på samme kort skal det kortet bare snu seg.
                            this.flipped = false;

                        } else {
                            this.flipped = true;
                            if (valg.img === this.img) { // Hvis bruker gjetter riktig, fjern kort med SetTimeout

                                if (player1.turn) {
                                    player1.count1++;

                                } else if (player2.turn) {
                                    player2.count2++;

                                }

                                antall.AmountFlip++;

                                finnkort.push(valg.img); //legger til listen min slikt at jeg kan se når spillet er ferdig 
                                //console.log(finnkort)

                                setTimeout((x) => {
                                    x.removed = true;
                                    this.removed = true;
                                }, 500, valg);

                                //console.log(players[0])
                                finish();
                            } else { // Hvis bruker gjetter feil, snu kortet
                                setTimeout((x) => {
                                    x.flipped = false;
                                    this.flipped = false;
                                }, 800, valg);
                                antall.AmountFlip++;
                                if (player1.turn) {
                                    player1.turn = false;
                                    player2.turn = true;
                                } else if (player2.turn) {
                                    player1.turn = true;
                                    player2.turn = false;

                                }
                            }
                        }


                        valg = undefined; // reset valg
                        console.log("Amount of flips during this game: " + AmountFlip);
                    }

                    //do finish() here 
                    this.function(o.target)

                },


            }
        });
        board.appendChild(card);
        new_cards.$mount(card);
    }

    board.style.width = 115 * 4 + 'px';
}


function finish() {
    if (finnkort.length == 8) {
        console.log("Game finished")
        if (player1.count1 < player2.count2) {
            alert("Player 2 vinner")
        } else {
            alert("Player 1 winner")
        }


    }

}


function snu() {
    this.style.transform = "rotateY(180deg)";
}


window.addEventListener("keyup", ev => {
    if (ev.keyCode === 13) {
        settkort();
        //Trykker enter for start
    }
})

//Blanding av imagelist 
function arrayShuffle(arr) {
    let newPos, temp;
    for (let i = arr.length - 1; i > 0; i--) {
        newPos = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[newPos];
        arr[newPos] = temp;
    }
    return
};



