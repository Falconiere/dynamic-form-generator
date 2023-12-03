## Dynamic Form Generator

This is a simple dynamic form generator that allows you to create a form with a set of fields and then generate a form based on that set of fields.  The project is built using Next.js, React, Typescript, tailwindcss, and Postgres.

### Getting Started
We are using supabase as our database and you will need to create an account and a project to get the values for the environment variables.  You can find more information about supabase [here](https://supabase.io/).
The table structure for the project is as follows:

![alt text](./documentation/assets//table-estructure.png "Table Structure")

Before you can run the project you will need to create a `.env.local` file in the root directory of the project.  This file should contain the following environment variables:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Once you have created the `.env.local` file you can run the following commands to get the project running locally:
```
yarn install
yarn dev
```