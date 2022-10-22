import { TranslationMessages } from "react-admin";
import englishMessages from "ra-language-english";

const customEnglishMessages: TranslationMessages = {
  ...englishMessages,
  pos: {
    search: "Search",
    configuration: "Configuration",
    language: "Language",
    theme: {
      name: "Theme",
      light: "Light",
      dark: "Dark",
    },
    dashboard: {
      monthly_revenue: "Monthly Revenue",
      month_history: "30 Day Revenue History",
      new_orders: "New Orders",
      pending_reviews: "Pending Reviews",
      all_reviews: "See all reviews",
      new_customers: "New Customers",
      all_customers: "See all customers",
      pending_orders: "Pending Orders",
      order: {
        items:
          "by %{customer_name}, one item |||| by %{customer_name}, %{nb_items} items",
      },
      welcome: {
        title: "Welcome to the catalyst funded project reports",
        subtitle: "subtitle.",
        ra_button: "cReport site",
        demo_button: "Source for this demo",
      },
    },
    menu: {
      Members: "Members",
      bLearns: "Quiz",
      proposals: "Proposals",
      tools: "Tools",
      reports: "Reports",
    },
  },
  resources: {
    reports: {
      import: "Import excels",
    },
    proposals: {
      name: "Proposal |||| Proposals",
      fields: {
        commands: "Orders",
      },
      filters: {
        last_visited: "Last visited",
        today: "Today",
      },
      fieldGroups: {},
      page: {
        delete: "Delete Customer",
      },
      errors: {
        password_mismatch:
          "The password confirmation is not the same as the password.",
      },
    },
    proposers: {
      name: "Proposer |||| Proposers",
      fields: {
        commands: "Orders",
      },
      filters: {
        last_visited: "Last visited",
        today: "Today",
      },
      fieldGroups: {},
      page: {
        delete: "Delete Customer",
      },
      errors: {
        password_mismatch:
          "The password confirmation is not the same as the password.",
      },
    },
    proposalKpis: {
      name: "Proposal KPI |||| Proposal KPIs",
      fields: {
        commands: "Orders",
      },
      filters: {
        last_visited: "Last visited",
        today: "Today",
      },
      fieldGroups: {},
      page: {
        delete: "Delete Customer",
      },
      errors: {
        password_mismatch:
          "The password confirmation is not the same as the password.",
      },
    },
    fundDeliveries: {
      name: "Fund delivery |||| Fund deliveries",
      fields: {
        commands: "Orders",
      },
      filters: {
        last_visited: "Last visited",
        today: "Today",
      },
      fieldGroups: {},
      page: {
        delete: "Delete Customer",
      },
      errors: {
        password_mismatch:
          "The password confirmation is not the same as the password.",
      },
    },
    cardanos: {
      name: "Fetch Cardano |||| Fetch Cardano",
      fields: {
        commands: "Orders",
      },
      filters: {
        last_visited: "Last visited",
        today: "Today",
      },
      fieldGroups: {},
      page: {
        delete: "Delete Customer",
      },
      errors: {
        password_mismatch:
          "The password confirmation is not the same as the password.",
      },
    },
    gits: {
      reportName: "Git commits",
      name: "Query github |||| Query github",
      fields: {
        commands: "Orders",
      },
      filters: {
        last_visited: "Last visited",
        today: "Today",
      },
      fieldGroups: {},
      page: {
        delete: "Delete Customer",
      },
      errors: {
        password_mismatch:
          "The password confirmation is not the same as the password.",
      },
    },
    funds: {
      name: "Fund |||| Funds",
      fields: {
        commands: "Orders",
      },
      filters: {
        last_visited: "Last visited",
        today: "Today",
      },
      fieldGroups: {},
      page: {
        delete: "Delete Customer",
      },
      errors: {
        password_mismatch:
          "The password confirmation is not the same as the password.",
      },
    },
    challenges: {
      name: "Challenge |||| Challenges",
      fields: {
        commands: "Orders",
      },
      filters: {
        last_visited: "Last visited",
        today: "Today",
      },
      fieldGroups: {},
      page: {
        delete: "Delete Customer",
      },
      errors: {
        password_mismatch:
          "The password confirmation is not the same as the password.",
      },
    },
    members: {
      name: "Member |||| Members",
      fields: {
        commands: "Orders",
        first_seen: "First seen",
        groups: "Segments",
        last_seen: "Last seen",
        last_seen_gte: "Visited Since",
        name: "Name",
        total_spent: "Total spent",
        password: "Password",
        confirm_password: "Confirm password",
        stateAbbr: "State",
      },
      filters: {
        last_visited: "Last visited",
        today: "Today",
        this_week: "This week",
        last_week: "Last week",
        this_month: "This month",
        last_month: "Last month",
        earlier: "Earlier",
        has_ordered: "Has ordered",
        has_newsletter: "Has newsletter",
        group: "Segment",
      },
      fieldGroups: {
        identity: "Identity",
        address: "Address",
        stats: "Stats",
        history: "History",
        password: "Password",
        change_password: "Change Password",
      },
      page: {
        delete: "Delete Customer",
      },
      errors: {
        password_mismatch:
          "The password confirmation is not the same as the password.",
      },
    },

    reviews: {
      name: "Review |||| Reviews",
      amount: "1 review |||| %{smart_count} reviews",
      relative_to_poster: "Review on poster",
      detail: "Review detail",
      fields: {
        customer_id: "Customer",
        command_id: "Order",
        product_id: "Product",
        date_gte: "Posted since",
        date_lte: "Posted before",
        date: "Date",
        comment: "Comment",
        rating: "Rating",
      },
      action: {
        accept: "Accept",
        reject: "Reject",
      },
      notification: {
        approved_success: "Review approved",
        approved_error: "Error: Review not approved",
        rejected_success: "Review rejected",
        rejected_error: "Error: Review not rejected",
      },
    },

    payouts: {
      name: "Payouts |||| Payouts",
      amount: "1 review |||| %{smart_count} reviews",
      relative_to_poster: "Review on poster",
      detail: "Review detail",
      fields: {
        customer_id: "Customer",
        command_id: "Order",
        product_id: "Product",
        date_gte: "Posted since",
        date_lte: "Posted before",
        date: "Date",
        comment: "Comment",
        rating: "Rating",
      },
      action: {
        accept: "Accept",
        reject: "Reject",
      },
      notification: {
        approved_success: "Review approved",
        approved_error: "Error: Review not approved",
        rejected_success: "Review rejected",
        rejected_error: "Error: Review not rejected",
      },
    },
    segments: {
      name: "Role |||| Roles",
      fields: {
        name: "Name",
        members: "Members",
        description: "Description",
      },
      data: {
        compulsive: "Compulsive",
        collector: "Collector",
        ordered_once: "Ordered once",
        regular: "Regular",
        returns: "Returns",
        reviewer: "Reviewer",
      },
    },
    quizSets: {
      name: "Quiz set |||| Quiz sets",
      fields: {
        customers: "Customers",
        name: "Name",
      },
    },
    quizzes: {
      name: "Quizzes |||| Quizzes",
      fields: {
        customers: "Customers",
        name: "Name",
      },
    },
  },
};

export default customEnglishMessages;
