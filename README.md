
  # User Role Management

  This is a code bundle for User Role Management. The original project is available at https://www.figma.com/design/Tu64mEiJpHOLetNrgpgglv/User-Role-Management.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Local Mock Login (Optional)

  Local mock files are intentionally git-ignored.
  This means `mock:login` and `ddev` do not affect normal development commands,
  but they can fail at runtime if local-only files are missing.

  - Normal app run: `pnpm dev` (no mock required)
  - Mock server only: `pnpm mock:login`
  - Mock + app together: `pnpm ddev`
  - Show behavior note: `pnpm ddev:info`

  Required local-only files for mock flow:

  - `.local/mock-login-server.mjs`
  - `vite.config.local.ts`
  