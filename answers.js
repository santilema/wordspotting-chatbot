// const prompt = require("prompt-sync")(); //for testing

// pre-defined data
const affirmativeResponses = [
  "yes",
  "please",
  "sure",
  "ok",
  "okay",
  "affirmative",
  "y",
  "yeah",
  "exactly",
  "yep",
  "right",
];

const negativeResponses = ["no", "nope", "don't", "not", "negative"];

const availableDates = ["05/08/2022", "06/08/2022", "07/08/2022"];

const availableDepartments = [
  "credit department",
  "customer support",
  "premium services",
  "investment department",
  "insurance department",
  "fraud department"
];

// Helper functions
function checkEmail(email) {
  // this regEx matches almost every valid email address
  return /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/.test(
    email
  );
}

function assignScore(conversationObject, userMessage) {
  let wordsToMatch;
  let score = 0;
  let indexes;
  let data;

  // Define what to do for each special conversation state
  switch (conversationObject.sentenceId) {
    case "appo-avail":
      let lowerCaseMessage = userMessage.toLowerCase();
      if (availableDepartments.includes(lowerCaseMessage)) {
        conversationObject.mainPhrase = `Great! These are the available dates for ${lowerCaseMessage}:#${availableDates}`;
        return { score: 100, data: { department: lowerCaseMessage } };
      }
      break;

    case "pick-up-verify":
      wordsToMatch = affirmativeResponses;
      break;

    case "pick-up-success":
      if (checkEmail(userMessage)) {
        conversationObject.mainPhrase = `Your results are ready. You can pick them up on reception from 8:00 to 17:00 everyday\nIn addition, a digital version will be sent to ${userMessage}`;
        return { score: 100, data: { email: userMessage } };
      }

    case "appo-type":
      wordsToMatch = affirmativeResponses;
      break;

    case "appo-email":
      indexes = listIndexes(availableDates);
      wordsToMatch = indexes.concat(availableDates);
      data = registerInput(availableDates, userMessage);
      if (typeof data === "string") {
        conversationObject.mainPhrase = `Great! To finish with your booking on ${data} I'll have to ask you for an email`;
      }
      break;

    case "appo-success":
      if (checkEmail(userMessage)) {
        conversationObject.mainPhrase = `Your appointment was registered :)\nDetails will be sent to ${userMessage}`;
        return { score: 100, data: { email: userMessage } };
      }
      break;

    case "visit-call":
      if (userMessage.length > 2) return { score: 100 };
      break;

    case "visit-number":
      if (userMessage.length > 4) return { score: 100 };
      break;

    case "create-account-email-success":
      if (checkEmail(userMessage)) {
        conversationObject.mainPhrase = `You will be contacted shortly to ${userMessage} regarding your account creation :)`;
        return { score: 100, data: { email: userMessage } };
      }
      break;

    case "close-account-email-success":
      if (checkEmail(userMessage)) {
        conversationObject.mainPhrase = `You will be contacted shortly to ${userMessage} regarding your account closure`;
        return { score: 100, data: { email: userMessage } };
      }
      break;

    case "modify-account-email-success":
      if (checkEmail(userMessage)) {
        return { score: 100, data: { email: userMessage } };
      }
      break;

    case "modify-account-contact-phone-success":
      if (userMessage.length > 4) { //could be replaced with a regEx to match phone numbers
        conversationObject.mainPhrase = `Your phone number was updated to ${userMessage}`;
        return { score: 100, data: { phone: userMessage } };
      }
      break;

    case "modify-account-contact-address-success":
      if (userMessage.length > 4) { //Maps API could be used to validate the address
        conversationObject.mainPhrase = `Your address was updated to ${userMessage}`;
        return { score: 100, data: { address: userMessage } };
      }
      break;

    case "modify-account-contact-email-success":
      if (checkEmail(userMessage)) {
        conversationObject.mainPhrase = `Your email was updated to ${userMessage}`;
        return { score: 100, data: { email: userMessage } };
      }
      break;

    default:
      wordsToMatch = conversationObject.expect;
  }

  if (typeof wordsToMatch === "undefined") {
    wordsToMatch = [];
  }

  const messageWords = userMessage
    .toLowerCase()
    .replace(/[,.?!]/, "")
    .split(" ");
  messageWords.forEach((word) => {
    if (wordsToMatch.includes(word)) {
      score += 1;
    }
  });

  return { score: score };
}

// Display options with an index
function printOptions(list) {
  let prettyString = "";
  for (let word = 0; word < list.length; word++) {
    if (word + 1 === list.length) {
      prettyString = prettyString + `${word}. ` + `${list[word]}`;
    } else {
      prettyString = prettyString + `${word}. ` + `${list[word]}/n`;
    }
  }
  return prettyString;
}

// Keep user info in a variable
function registerInput(listOfOptions, userInput) {
  const messageWords = userInput
    .toLowerCase()
    .replace(/[,.?!]/, "")
    .split(" ");
  let registered;

  if (messageWords.length === 1) {
    let singleInput = messageWords[0];
    if (/^\d+$/.test(singleInput)) {
      registered = listOfOptions[+singleInput];
    } else {
      if (listOfOptions.includes(singleInput.toLowerCase())) {
        registered = singleInput.toLowerCase();
      }
    }
  } else {
    messageWords.forEach((word) => {
      if (listOfOptions.includes(word)) {
        registered = word;
      }
    });
  }
  return registered;
}

// Creates a list of indexes
function listIndexes(listOfOptions) {
  const indexes = [];
  for (let index = 0; index < listOfOptions.length; index++) {
    indexes.push(index.toString());
  }
  return indexes;
}

// Initial conversation tree
export const conversationRaw = {
  sentencecId: "base",
  mainPhrase: "Can I help you with something else?",
  thirdPhrase:
    "Sorry, I don't know how to do that. Is there anything else I can help you with?",
  conversationFlow: [
    {
      sentenceId: "help",
      mainPhrase: "I'm glad. Just tell me",
      expect: affirmativeResponses,
    },
    {
      sentenceId: "bye",
      mainPhrase: "Okay, good bye then :)",
      expect: negativeResponses,
    },
    {
      sentenceId: "hello",
      mainPhrase: "Hello! Can I help you with something?",
      expect: ["hello", "hi", "morning", "evening", "good"],
    },
    {
      sentenceId: "loc",
      mainPhrase:
        "Our branch located on Example Street 123 opens Monday to Friday from 8 to 14 hours. Please, make sure to have your appointment booked before coming.",
      expect: [
        "street",
        "location",
        "located",
        "where",
        "entrance",
        "access",
        "open",
        "opening",
        "schedule",
        "direction",
        "address",
      ],
      direct: "base",
    },
    {
      sentenceId: "appo",
      mainPhrase: "Do you want to book an appointment?",
      secondPhrase:
        "All right, so we are booking an appointment then, is that ok?",
      expect: [
        "appointment",
        "consultation",
        "booking",
        "book",
      ],
      conversationFlow: [
        {
          sentenceId: "appo-fail",
          mainPhrase:
            "Oh, I probably got that wrong then. Could you please reformulate?",
          expect: negativeResponses,
        },
        {
          sentenceId: "appo-type",
          mainPhrase: `These are the departments offering online appointments. Please, choose one:#${availableDepartments}`,
          expect: affirmativeResponses,
          conversationFlow: [
            {
              sentenceId: "appo-avail",
              mainPhrase: `These are the available dates, please choose one:#${availableDates}`,
              conversationFlow: [
                {
                  sentenceId: "appo-email",
                  mainPhrase: `Great! To finish with your booking I'll have to ask you for an email`,
                  conversationFlow: [
                    {
                      sentenceId: "appo-success",
                      mainPhrase: "Your appointment was registered :)",
                      direct: "base",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      sentenceId: "create-account",
      mainPhrase: "Do you want to create a new account?",
      expect: ["account", "new", "create", "register", "sign", "open"],
      conversationFlow: [
        {
          sentenceId: "create-account-fail",
          mainPhrase: "Oh, I probably got that wrong then. Could you try to reformulate?",
          expect: negativeResponses,
        },
        {
          sentenceId: "create-account-success",
          mainPhrase: "Great! To finish with your account creation I'll have to ask you for an email",
          expect: affirmativeResponses,
          conversationFlow: [
            {
              sentenceId: "create-account-email-success",
              direct: "base"
            },
          ],
        },
      ],
    },
    {
      sentenceId: "close-account",
      mainPhrase: "Do you want to close your account?",
      expect: ["close", "delete", "remove", "account"],
      conversationFlow: [
        {
          sentenceId: "close-account-fail",
          mainPhrase: "Oh, I probably got that wrong then. Could you try to reformulate?",
          expect: negativeResponses,
        },
        {
          sentenceId: "close-account-success",
          mainPhrase: "I am sorry to hear that. To start with your account closure I'll have to ask you for an email",
          expect: affirmativeResponses,
          conversationFlow: [
            {
              sentenceId: "close-account-email-success",
              direct: "base"
            }
          ]
        }
      ]
    },
    {
      sentenceId: "modify-account",
      mainPhrase: "Do you want to modify your account?",
      expect: ["modify", "change", "update", "account"],
      conversationFlow: [
        {
          sentenceId: "modify-account-fail",
          mainPhrase: "Oh, I probably got that wrong then. Could you try to reformulate?",
          expect: negativeResponses,
        },
        {
          sentenceId: "modify-account-success",
          mainPhrase: "Great! To start with your account modification I'll have to ask you for an email",
          expect: affirmativeResponses,
          conversationFlow: [
            {
              sentenceId: "modify-account-email-success",
              mainPhrase: "I can help you correcting your contact information or upgrading your account. Which one do you want to do?",
              conversationFlow: [
                {
                  sentenceId: "modify-account-contact",
                  mainPhrase: "I can help you correcting your phone number, address or your email. Which one do you want to do?",
                  expect: ["contact", "information", "phone", "address", "email"],
                  conversationFlow: [
                    {
                      sentenceId: "modify-account-contact-phone",
                      mainPhrase: "Please, tell me your new phone number",
                      expect: ["phone", "number"],
                      conversationFlow: [
                        {
                          sentenceId: "modify-account-contact-phone-success",
                          direct: "base"
                        }
                      ]
                    },
                    {
                      sentenceId: "modify-account-contact-address",
                      mainPhrase: "Please, tell me your new address",
                      expect: ["address"],
                      conversationFlow: [
                        {
                          sentenceId: "modify-account-contact-address-success",
                          direct: "base"
                        }
                      ]
                    },
                    {
                      sentenceId: "modify-account-contact-email",
                      mainPhrase: "Please, tell me your new email",
                      expect: ["email", "mail"],
                      conversationFlow: [
                        {
                          sentenceId: "modify-account-contact-email-success",
                          direct: "base"
                        }
                      ]
                    }
                  ]
                },
                {
                  sentenceId: "modify-account-upgrade",
                  expect: ["upgrade", "improve", "account"],
                  mainPhrase: "Okay, an agent will get in touch with you to help you with your account upgrade",
                  direct: "base"
                }
              ]
            }
          ]
        }
      ]
    }
  ],
};

// Functions to make conversation
export function talk(flow, userMessage, ite) {
  let depth = 0;
  let heighestScore = 0;
  let selectedPath;
  let altPath;
  let responseMsg;
  let currentObject;
  let conver;

  for (let index = 0; index < flow.length; index++) {
    currentObject = flow[index];
    let analysedMessage = assignScore(currentObject, userMessage);
    let score = analysedMessage.score;

    if (score > heighestScore) {
      selectedPath = currentObject;
      heighestScore = score;
      if (typeof altPath !== "undefined") {
        altPath = undefined;
      }
    } else if (score === heighestScore && score !== 0) {
      altPath = currentObject;
    }
  }
  if (heighestScore > 0) {
    ite = 0;
    if (typeof altPath !== "undefined") {
      selectedPath.expect.push("first", "1", "1st", "one", "a");
      altPath.expect.push("second", "two", "2", "2nd", "b");
      responseMsg = `I can just handle one thing at once :(\n${selectedPath.mainPhrase} or\n${altPath.mainPhrase}`;
      selectedPath.mainPhrase = selectedPath.secondPhrase;
      altPath.mainPhrase = altPath.secondPhrase;
      conver = { conversationFlow: flow };
    } else {
      if (typeof selectedPath.conversationFlow === "undefined") {
        if (
          selectedPath.sentenceId === "bye" ||
          selectedPath.sentenceId === "help" ||
          selectedPath.sentenceId === "hello"
        ) {
          responseMsg = selectedPath.mainPhrase;
        } else {
          responseMsg =
            selectedPath.mainPhrase + `\n${conversationRaw.mainPhrase}`;
        }
        conver = conversationRaw;
      } else {
        responseMsg = selectedPath.mainPhrase;
        conver = selectedPath;
      }
    }
  } else {
    if (ite < 2) {
      responseMsg = "I didn't get that. Please, try to reformulate";
      conver = { conversationFlow: flow };
      ite += 1;
    } else {
      conver = conversationRaw;
      responseMsg = conversationRaw.thirdPhrase;
    }
  }

  return {
    updatedConversation: conver,
    outMessageText: responseMsg,
    iteration: ite,
  };
}

// function someFancyLogic(inMessage, conversationState, iteration) {
//   const responseObject = talk(
//     conversationState.conversationFlow,
//     inMessage,
//     iteration
//   );
//   console.log(responseObject.outMessageText);
//   let nextMessage = prompt("Your response: ");
//   someFancyLogic(
//     nextMessage.toString(),
//     responseObject.updatedConversation,
//     responseObject.iteration
//   );
// }

// const firstMessage = prompt("Your query: ");
// someFancyLogic(firstMessage, conversationRaw, 0);