$(document).ready(function () {
    console.log("client.js connected!");

    const addBurger = (uuid, burger_name, devoured) => {
        let burgerDiv = $("<div>");
        let burger = $("<div>");
        let devour = $("<a>");
        let icon = $("<i>");

        burgerDiv.attr("class", "burgerDiv")
            .attr("data-id", uuid)
            .attr("data-name", burger_name);

        burger.attr("class", "flow-text red burger")
            .text(` ${burger_name}`);

        icon.attr("class", "fas fa-hamburger");

        devour.attr("class", "devour flow-text waves-effect waves-light btn")
            .attr("data-id", uuid)
            .text("Devour");

        devour.on("click", function (e) {

            console.log("devour clicked");
            const $this = $(this);
            const uuid = $this.attr("data-id");
            const parent = $this.parent();

            $.post("/api/devour", { id: uuid }).then(results => {
                console.log(results);
                // const { uuid, burger_name, devoured, ...rest } = results;
                devourBurger(parent);
            }).catch(err => {
                console.log(err);
                throw err
            });

            // devourClick();
        })

        burger.prepend(icon);
        burgerDiv.append(burger);

        if (!devoured) {
            burgerDiv.append(devour);
            $("div.notDevoured").append(burgerDiv);
        }
        else $("div.devoured").append(burgerDiv);
    }

    const devourBurger = (burgerDiv) => {
        console.log(burgerDiv);
        const uuid = burgerDiv.attr("data-id");
        const name = burgerDiv.children("div.burger").text();
        console.log("parent uuid", uuid);
        console.log("parent name", name);

        burgerDiv.hide();

        addBurger(uuid, name, true);
        // const burger = $("div.burgerDiv").attr("data-id", `${uuid}`);

        // const name = burger.attr("data-name");

        // if ($(`burgerDiv.${uuid}`)) $(`burgerDiv.${uuid}`).hide();

        // addBurger(uuid, burger_name, true);
    }

    $("a.burgerSubmit").on("click", function (e) {
        let newBurgerName = $("#burger_name").val();
        if (newBurgerName) {
            $.post("/api/add", { burger_name: newBurgerName, devoured: false }).then(results => {
                const { uuid, burger_name, devoured, ...rest } = results;
                addBurger(uuid, burger_name, devoured);
            }).catch(err => {
                console.log(err);
                throw err
            });
        }
    })

    $("a.devour").on("click", function (e) {

        console.log("devour clicked");
        const $this = $(this);
        const uuid = $this.attr("data-id");
        const parent = $this.parent();

        $.post("/api/devour", { id: uuid }).then(results => {
            console.log(results);
            // const { uuid, burger_name, devoured, ...rest } = results;
            devourBurger(parent);
        }).catch(err => {
            console.log(err);
            throw err
        });

        // devourClick();
    })
});