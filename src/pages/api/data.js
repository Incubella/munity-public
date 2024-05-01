const data = {
  events_categories: [
    {
      id: "london",
      title: "Events in London",
      description:
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem",
      image:
        "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: "san-francisco",
      title: "Events in San Francisco",
      description:
        "corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate.",
      image:
        "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
    },
    {
      id: "barcelona",
      title: "Events in Barcelona",
      description:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscisfa.",
      image:
        "https://images.unsplash.com/photo-1579282240050-352db0a14c21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=652&q=80",
    },
  ],
  allEvents: [
    {
      id: "london-comic-con-winter",
      title: "London Comic Con Winter",
      city: "London",
      description:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscisfa.",
      image:
        "https://images.unsplash.com/photo-1608889476561-6242cfdbf622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      emails_registered: [],
    },
    {
      id: "hyde-park-winter-wonderland",
      title: "Hyde Park Winter Wonderland",
      city: "London",
      description:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscisfa.",
      image:
        "https://hydeparkwinterwonderland.com/static/252d7fe6693a6a8b1887bd2049204103/039f7/2021-503x503-3.webp",
      emails_registered: [],
    },
    {
      id: "new-years-eve-in-london-2023",
      title: "New Years Eve in London 2023 ",
      city: "London",
      description:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscisfa.",
      image:
        "https://images.unsplash.com/photo-1521478413868-1bbd982fa4a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      emails_registered: [],
    },
    {
      id: "'edtech-world-summit-2022",
      title: "EdTech World Summit 2022",
      city: "london",
      description:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscisfa.",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      emails_registered: ["alicia@gmail.com", "monica@gmail.com"],
    },
    {
      id: "sigala-at-electric-brixton",
      title: "Sigala at Electric Brixton",
      city: "london",
      description:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscisfa.",
      image:
        "https://images.unsplash.com/photo-1478147427282-58a87a120781?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      emails_registered: ["monica@gmail.com"],
    },
    {
      id: "kiss-haunted-house-party-2022",
      title: "KISS Haunted House Party 2022",
      city: "london",
      description:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscisfa.",
      image:
        "https://wembleypark.com/media/images/KISS-HHP-42-1440x810-Logos-Date-de.2e16d0ba.fill-496x279.jpg",
      emails_registered: [],
    },
    {
      id: "sf-blockchain-week",
      title: "SF Blockchain Week",
      city: "san-francisco",
      description:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscisfa.",
      image:
        "https://images.unsplash.com/photo-1516245834210-c4c142787335?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
      emails_registered: [
        "",
        "",
        "",
        "laura@gmail.com",
        "laura@gmail.com",
        "laura@gmail.com",
      ],
    },
    {
      id: "innovation-summit-san-francisco",
      title: "Innovation Summit San Francisco",
      city: "san-francisco",
      description:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscisfa.",
      image:
        "https://images.unsplash.com/photo-1521464302861-ce943915d1c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
      emails_registered: [],
    },
    {
      id: "fan-expo-san-francisco",
      title: "FAN EXPO San Francisco",
      city: "san-francisco",
      description:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscisfa.",
      image:
        "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      emails_registered: [],
    },
    {
      id: "san-francisco-opera---san-francisco-tickets",
      title: "San Francisco Opera - San Francisco Tickets",
      city: "san-francisco",
      description:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscisfa.",
      image:
        "https://images.unsplash.com/photo-1580809361436-42a7ec204889?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      emails_registered: [],
    },
    {
      id: "concert-christian-löffler-+-detect-ensemble",
      title: "Concert Christian Löffler + Detect Ensemble",
      city: "barcelona",
      description:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscisfa.",
      image:
        "https://images.unsplash.com/photo-1478147427282-58a87a120781?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      emails_registered: ["alicia@gmail.com", "monica@gmail.com"],
    },
    {
      id: "the-halloween-house-party",
      title: "The Halloween House Party",
      city: "barcelona",
      description:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscisfa.",
      image:
        "https://images.unsplash.com/photo-1587407627257-27b7127c868c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      emails_registered: [
        "alicia@gmail.com",
        "monica@gmail.com",
        "david@yahoo.com",
        "claire@ss.com",
      ],
    },
    {
      id: "international-conference-on-industrial-design",
      title: "International Conference on Industrial Design",
      city: "barcelona",
      description:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscisfa.",
      image:
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      emails_registered: ["alicia@gmail.com", "monica@gmail.com"],
    },
    {
      id: "world-congress-2022---barcelona",
      title: "World Congress 2022 - Barcelona",
      city: "barcelona",
      description:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscisfa.",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      emails_registered: ["alicia@gmail.com", "monica@gmail.com"],
    },
    {
      id: "riskminds-international",
      title: "RiskMinds International",
      city: "barcelona",
      description:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscisfa.",
      image:
        "https://images.unsplash.com/photo-1591115765373-5207764f72e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      emails_registered: ["alicia@gmail.com", "monica@gmail.com"],
    },
  ],
};
