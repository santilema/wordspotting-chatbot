const prompt = require("prompt-sync")();

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

const availableDates = ["05/07/2022", "06/07/2022"];

const departments = [
    {
        name: "cardiology",
        schedule: 'Mon - Fri 8:00 - 17:00\n Sat 8:00 - 14:00'
    },
    {
        name: "neurology",
        schedule: 'Mon - Sat 8:00 - 14:00'
    },
    {
        name: "paedriatics",
        schedule: 'Mon - Fri 8:00 - 17:00\n Sat 8:00 - 14:00'
    },
    {
        name: "psychiatry",
        schedule: 'Mon - Fri 10:00 - 19:00\n Sat 10:00 - 16:00'
    }
];

function getDepartments(departmentsData) {
    const deparmentsList = [];
    departmentsData.forEach((department) => {
        deparmentsList.push(department.name);
    });
    return deparmentsList;
}

const availableDepartments = getDepartments(departments);

// Initial conversation tree
const conversationRaw = {
  sentencecId: "base",
  mainPhrase: "Hi my name is Hospi, how can I help you?",
  secondPhrase: "Is there anything else I can help with?",
  thirdPhrase:
    "Sorry, I don't know how to do that. Is there anything else I can help you with?",
  expect: [],
  level: 0,
  conversationFlow: [
    {
      sentenceId: "pick-up",
      mainPhrase: "Do you have to pick-up some study results?",
      secondPhrase: "You have to collect some results, is that right?",
      expect: [
        "pick",
        "up",
        "pickup",
        "collect",
        "results",
        "result",
        "study",
        "studies",
      ],
      level: 1,
      conversationFlow: [
        {
          sentenceId: "pick-up-verify",
          mainPhrase:
            "please, write down your email to check if your results are available already",
          expect: [
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
          ],
          level: 2,
          conversationFlow: [
            {
              sentenceId: "pick-up-success",
              mainPhrase:
                "Your results are ready. You can pick them up on reception from 8:00 to 17:00 everyday",
              level: 3,
              direct: "base",
            },
          ],
        },
      ],
    },
    {
      sentenceId: "loc",
      mainPhrase:
        "The hospital is located on Example Street 123. Attention 24 hours for emergencies. Please, consult opening hours for specific departments",
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
      level: 1,
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
        "date",
        "session",
        "when",
        "available",
        "free",
        "week",
        "month",
      ],
      level: 1,
      conversationFlow: [
        {
          sentenceId: "appo-type",
          mainPhrase: `The following departments are taking online turns:\n${availableDepartments}\nFor which would you like to book yout appointment?`,
          expect: [
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
          ],
          level: 2,
          conversationFlow: [
            {
              sentenceId: "appo-avail",
              mainPhrase: `These are the available dates:\n${availableDates}\nPlease, select one date`,
              level: 3,
              conversationFlow: [
                {
                  sentenceId: "appo-email",
                  mainPhrase: `Great! To finish with your booking I'll have to ask you for an email`,
                  level: 4,
                  conversationFlow: [
                    {
                      sentenceId: "appo-success",
                      mainPhrase: "Your appointment was registered :)",
                      level: 5,
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
  ],
};

// Helper functions
function checkEmail(email) {
  // this regEx matches almost every valid email address
  return /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/.test(
    email
  );
}

// function checkAcvailableDates(datesDataSet) {
//    datesDataSet.forEach((date) => {

//    };
// };

function assignScore(conversationObject, userMessage) {
  console.log(conversationObject.sentenceId);
  let wordsToMatch;
  let score = 0;

  switch (conversationObject.sentenceId) {
    case "pick-up-verify":
      wordsToMatch = affirmativeResponses;

    case "pick-up-success":
        if (checkEmail(userMessage)) {
            conversationObject.mainPhrase = `Your results are ready. You can pick them up on reception from 8:00 to 17:00 everyday\nIn addition, a digital version will be sent to ${userMessage}`;
            return { score: 100, data: { email: userMessage } };
          }

    case "appo-type":
      wordsToMatch = affirmativeResponses;

    case "appo-avail":
      wordsToMatch = availableDepartments;

    case "appo-email":
      wordsToMatch = availableDates;

    case "appo-success":
      if (checkEmail(userMessage)) {
        conversationObject.mainPhrase = `Your appointment was registered :)\nDetails will be sent to ${userMessage}`;
        return { score: 100, data: { email: userMessage } };
      }

    default:
      wordsToMatch = conversationObject.expect;
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

// Functions to make conversation
function talk(flow, userMessage, ite) {
  let depth = 0;
  let heighestScore = 0;
  let selectedPath;
  let altPath;
  let responseMsg;

  for (let index = 0; index < flow.length; index++) {
    currentObject = flow[index];
    let analyseMessage = assignScore(currentObject, userMessage);
    let score = analyseMessage.score;

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
      responseMsg = selectedPath.mainPhrase;
      conver = selectedPath;
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

function someFancyLogic(inMessage, conversationState, iteration) {
  const responseObject = talk(
    conversationState.conversationFlow,
    inMessage,
    iteration
  );
  console.log(responseObject.outMessageText);
  let nextMessage = prompt("Your response: ");
  // console.log(responseObject.updatedConversation)
  someFancyLogic(
    nextMessage,
    responseObject.updatedConversation,
    responseObject.iteration
  );
}

const firstMessage = prompt("Your query: ");
someFancyLogic(firstMessage, conversationRaw, 0);
