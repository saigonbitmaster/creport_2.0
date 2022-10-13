import { TranslationMessages } from "react-admin";
import frenchMessages from "ra-language-french";

const customFrenchMessages: TranslationMessages = {
  ...frenchMessages,
  pos: {
    search: "Rechercher",
    configuration: "Configuration",
    language: "Langue",
    theme: {
      name: "Theme",
      light: "Clair",
      dark: "Obscur",
    },
    dashboard: {
      monthly_revenue: "CA à 30 jours",
      month_history: "Chiffre d'affaire sur 30 jours",
      new_orders: "Nouvelles commandes",
      pending_reviews: "Commentaires à modérer",
      all_reviews: "Voir tous les commentaires",
      new_customers: "Nouveaux clients",
      all_customers: "Voir tous les clients",
      pending_orders: "Commandes à traiter",
      order: {
        items:
          "par %{customer_name}, un poster |||| par %{customer_name}, %{nb_items} posters",
      },
      welcome: {
        title: "Bienvenue sur la démo e-commerce de react-admin",
        subtitle:
          "Ceci est le back-office d'un magasin de posters imaginaire. N'hésitez pas à explorer et à modifier les données. La démo s'exécute en local dans votre navigateur, et se remet à zéro chaque fois que vous rechargez la page.",
        ra_button: "Site web de react-admin",
        demo_button: "Code source de cette démo",
      },
    },
    menu: {
      sales: "Ventes",
      catalog: "Catalogue",
      customers: "Clients",
    },
  },
  resources: {
    customers: {
      name: "Client |||| Clients",
      fields: {
        address: "Rue",
        birthday: "Anniversaire",
        city: "Ville",
        stateAbbr: "Etat",
        commands: "Commandes",
        first_name: "Prénom",
        first_seen: "Première visite",
        groups: "Segments",
        has_newsletter: "Abonné à la newsletter",
        has_ordered: "A commandé",
        last_name: "Nom",
        last_seen: "Vu le",
        last_seen_gte: "Vu depuis",
        latest_purchase: "Dernier achat",
        name: "Nom",
        total_spent: "Dépenses",
        zipcode: "Code postal",
        password: "Mot de passe",
        confirm_password: "Confirmez le mot de passe",
      },
      filters: {
        last_visited: "Dernière visite",
        today: "Aujourd'hui",
        this_week: "Cette semaine",
        last_week: "La semaine dernière",
        this_month: "Ce mois-ci",
        last_month: "Le mois dernier",
        earlier: "Plus tôt",
        has_ordered: "A déjà commandé",
        has_newsletter: "Abonné newsletter",
        group: "Segment",
      },
      fieldGroups: {
        identity: "Identité",
        address: "Adresse",
        stats: "Statistiques",
        history: "Historique",
        password: "Mot de passe",
        change_password: "Changer le mot de passe",
      },
      page: {
        delete: "Supprimer le client",
      },
      errors: {
        password_mismatch:
          "La confirmation du mot de passe est différent du mot de passe.",
      },
    },
    commands: {
      name: "Commande |||| Commandes",
      amount: "1 commande |||| %{smart_count} commandes",
      title: "Commande n°%{reference}",
      fields: {
        basket: {
          delivery: "Frais de livraison",
          reference: "Référence",
          quantity: "Quantité",
          sum: "Sous-total",
          tax_rate: "TVA",
          taxes: "TVA",
          total: "Total",
          unit_price: "P.U.",
        },
        address: "Adresse",
        customer_id: "Client",
        date_gte: "Emises depuis",
        date_lte: "Emises avant",
        nb_items: "Nb articles",
        reference: "Référence",
        returned: "Annulée",
        status: "Etat",
        total_gte: "Montant minimum",
      },
      section: {
        order: "Commande",
        customer: "Client",
        shipping_address: "Adresse de livraison",
        items: "Articles",
        total: "Total",
      },
    },

    segments: {
      name: "Segment |||| Segments",
      fields: {
        customers: "Clients",
        name: "Nom",
      },
      data: {
        compulsive: "Compulsif",
        collector: "Collectionneur",
        ordered_once: "A commandé",
        regular: "Régulier",
        returns: "A renvoyé",
        reviewer: "Commentateur",
      },
    },
  },
};

export default customFrenchMessages;
