import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  da: {
    translation: {
      "email is required": "email er påkrævet",
      "password is required":"password er påkrævet",
      "groups is required": "grupper er påkrævet",
      "Message": "Besked",
      "From": "Fra",
      "To": "Til",
      "Subject": "Emne",
      "Cancel": "Fortryd",
      "Submit": "Indsend",
      "Announcements": "Meddelelser",
      "A list of the latest announcenements": "En liste over de seneste meddelser",
      "Add": "Tilføj",
      "Refresh": "Genindlæs",
      "Dashboard": "Oversigt",
      "Groups": "Grupper",
      "Services": "Tjenester",
      "Subscribe": "Abonner",
      "All systems works appropriately": "Alle systemer virker hensigtsmæssigt",
      "One or more systems are experiencing problems": "Et eller flere systemer oplever problemer",
      "Last updated": "Sidst opdateret",
      "A list of all services": "En liste over all tjenester",
      "A list of all groups": "En liste over all grupper",
      "Save": "Gem",
      "Update": "Opdater",
      "Fill out the form below in order to get notified": "Udfyld nedenstående formular og bliv underrettet",
      "Check your email. You should recieve a confirmation": "Tjek din email. Du vil modtage en bekræftelse",
      "Name": "Navn",
      "Display-order": "Visningsrækkefølge",
      "Description": "Beskrivelse",
      "Identifier": "Identifikator",
      "is required": "er påkrævet",
      "is not valid": "er ikke gyldig",
      "Delete": "Slet",
      "Edit": "Rediger",
      "History": "Historik",
      "The chart below shows the status corrosponding to the last 90 days": "Nedenstående graf viser status over de seneste 90 dage",
      "Your subscription could unfortunately not be confirmed": "Dit abbonnement blev desværre ikke bekræftet",
      "Your subscription has been confirmed": "Dit abbonement blev bekræftet",
      "Success": "Success",
      "Error": "Fejl" ,
      "You are about to delete the service": "Du er ved at slette tjenesten",
      "You are about to delete the group": "Du er ved at slette gruppen",
      "You are about to delete the announcement": "Du er ved at slette meddelelsen",
      "Delete announcement": "Slet meddelelsen",
      "Show on dashboard": "Vis på dashboard"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "da", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;