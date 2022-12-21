# kitTyAct
KIT TYpescript reAct : Template project for frontend projects in typescript/react. 

# Use KitTyAct as template
1. Press the green button in github saying "Use template"
1. Clone the new project to your own machine
1. Run the file setup.sh with the name of your dockerhub-repo, so if your repo is kvalitetsit/medcom-sdn-ui, it should be executed like `sh setup.sh medcom-sdn-ui` 
1. You are ready to go!

# Requirements
The project is installed using `npx create-react-app my-template-app --template typescript` 

With:
- Node : `16.1.15`

# Get started
1. Clone repo to your own machine
1. cd into `react-app` folder
1. run `npm install`
1. run `npm run start` and you should be good to go

# Tools used:
## Redux
> https://www.youtube.com/watch?v=HKU24nY8Hsc

We are using Redux, and its toolkit to use redux state storage. By using this components are able to share state. If Redux was not used, we would have to share the data through properties insted.

## Formik
> https://www.youtube.com/watch?v=UVnKG6RmwMs (from 18th minute)

We use formik to do the validation in our forms

### Yup
> https://github.com/jquense/yup

Yup can provide us with great tools to make validation. We make a schema containing our validation like
```
let userSchema = object({
  name: string().required(),
  age: number().required().positive().integer(),
  email: string().email(),
  website: string().url().nullable(),
  createdOn: date().default(() => new Date()),
});
```

## CASL
> https://medium.com/dailyjs/managing-user-permissions-in-your-react-app-a93a94ff9b40

We use CASL to manage user permissions. A user-model has been created, and contains a role. Then we can define what any role can do like
```
        case Role.ADMIN:
            can('manage', 'all'); //all is a wildcard, so fx a admin can manage all, or read all
            break;
        case Role.USER:
            can('create', 'Todo');
            can('read', 'Todo', { authorId: user.id });
            can('update', 'Todo', { authorId: user.id });
            can('delete', 'Todo', { authorId: user.id });
            break;
```
And then we can use the following component in react, to check if a given user, is allowed to see or do something like: 
```
<Can ability={loggedInAs.getAbility()} I="delete" a="Todo"> //Can I delete a todo, with the ability that my user has
    ...
</Can>
```

## Toasty
> https://devdojo.com/krissanawat101/getting-started-on-react-toast-notifications

We use toasy to make toasts happend anywhere at anytime, with a simple functioncall like
```
toast.info("This is a toast")
```

## i18Next
> https://www.i18next.com/

We use i18Next to make it possible for us to translate to multiple languages later on. Everytime you are about to write something in the app, simply use the function t from i18next ( `import { t } from 'i18next'` ). To translate it, we go to the i18n.tsx-file (next to index.tsx) and in here, we can define translations. 

