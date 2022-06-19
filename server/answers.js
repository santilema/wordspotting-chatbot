const availableDates = ['05/07/2022', '06/07/2022']
const availableDepartments = ["Cardiology", "Neurology", "Paedriatics", "Psychiatry"]

const conversation = {
        sentencecId: "base",
        mainPhrase: "Hi my name is Hospi, how can I help you?",
        secondPhtase: "Is there anything else I can help with?",
        thirdPhrase: "Sorry, I don't know how to do that. Is there anything else I can help you with?",
        expect: [],
        level: 0,
        conversationFlow: [
            {
                sentenceId: "loc",
                content: "The hospital is located on Example Street 123. Attention 24 hours for emergencies. Please, consult opening hours for specific departments",
                expect: ["street", "location", "where", "entrance", "access", "open", "opening", "schedule", "direction", "address"],
                level: 1,

            },
            {
                sentenceId: "appo",
                content: "Would you like to book an appointment?",
                expect: ["appointment", "consultation", "booking", "book", "date", "session", "when", "available", "free", "week", "month"],
                level: 1,
                conversationFlow: [
                    {
                        sentenceId: "appo-type",
                        content: `The following departments are taking online turns:\n${availableDepartments}\nFor which would you like to book yout appointment?`,
                        expect: ["yes", "please", "sure", "ok", "okay"],
                        level: 2,
                        conversationFlow: [
                            {
                                sentenceId: "appo-avail",
                                content: `These are the available dates:\n${availableDates}\nPlease, select one date`,
                                expect: availableDepartments,
                                conversationFlow: [
                                    {
                                        sentenceId: "appo-email",
                                        content: `Great! To finish with your booking I'll have to ask you for an email`,
                                        expect: availableDates,
                                        conversationFlow: [
                                    {
                                        
                                    }
                                ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };

function talk(conver, userMessage, iteration){
    const messageWords = userMessage.toLowerCase().replace(/[,.]/,"").split(' '); //converts message into array of words
    let depth = 0;
    let heighestScore = 0;
    let selectedPath;
    let altPath;
    let responseMsg

    for (let index = 0; index < conver.conversationFlow.length; index++) {
        currentObject = conver.conversationFlow[index];
        let score = 0;
        messageWords.forEach(word => {
            if (currentObject.expect.includes(word)) {
                score += 1;
            }
        });
        if (score > heighestScore) {
            selectedPath = conver.conversationFlow[index];
            heighestScore = score;
            if (typeof altPath !== "undefined") {
                altPath = undefined;
            }
        } else if (score === heighestScore && typeof selectedPath !== "undefined") {
            altPath = selectedPath;
            selectedPath = conver.conversationFlow[index]
        }
    }
    if (heighestScore > 0) {
        if (typeof altPath !== "undefined") {
            selectedPath.expect.push("first", "1", "1st", "one", "a");
            altPath.expect.push("second", "two", "2", "2nd", "b");
            responseMsg = `I didn't get that very clearly,\n${selectedPath.content} or\n${altPath.content}`;
        } else {
            responseMsg = selectedPath.content;
            conver = selectedPath.conversationFlow;
        }
    }

    return {
        updatedConversation: conver,
        outMessageText: responseMsg
    };
}

function someFancyLogic(inMessage) {
    const responseObject = talk(conversation, inMessage, 0);
    console.log(responseObject.outMessageText);
}

someFancyLogic("I'd like to make an appointment");