# WebMCP tools

The portfolio exposes four tools to AI agents through
[WebMCP](https://webmachinelearning.github.io/webmcp). They are registered with
`document.modelContext.registerTool()` and are a progressive enhancement: in
browsers without the API the top-right **AI tools** menu still works as normal
shortcuts.

## Tools

| Tool | Input | Behaviour |
| --- | --- | --- |
| `get_portfolio_profile` | none | Read-only summary: role, location, availability, stack, languages and links. |
| `download_cv` | none | Downloads `/cv.pdf` and returns the direct URL as a fallback. |
| `contact_victor` | `channel` (`email` default, `linkedin`, `github`), `subject`, `message` | Opens a prefilled email draft or the chosen profile. Never sends anything. |
| `open_rnfactory` | none | Opens `https://rn-factory.com/` in a new tab. |

Implementation: `src/lib/webmcp.js` (tools and actions), `src/hooks/useWebMcp.js`
(registration lifecycle), `src/components/WebMcpMenu.js` (UI). Tool descriptions
are intentionally in English; the panel copy is localised.

## Try it locally

1. Enable WebMCP in Chrome: open `chrome://flags/#enable-webmcp-testing`, set it
   to **Enabled** and relaunch.
2. Run the site (`npm run dev`) and open it.
3. Verify registration in the console:

   ```js
   await document.modelContext.getTools();
   ```

   Or use DevTools → **Application** → **WebMCP**.
4. Use the [Model Context Tool Inspector](https://chromewebstore.google.com/detail/model-context-tool-inspec/gbpdfapgefenggkahomfgkhfehlcenpd)
   extension to call the tools with a natural-language prompt.

In a normal browser the panel reports **Not available in this browser** and all
four shortcuts keep working.

## Production (origin trial)

WebMCP is currently behind a Chrome origin trial. To let agents call the tools on
the deployed site:

1. Register `https://vldm.is-a.dev` at the
   [WebMCP origin trial](https://developer.chrome.com/origintrials/#/register_trial/4163014905550602241).
2. Add the generated token to Netlify as `WEBMCP_ORIGIN_TRIAL_TOKEN`.
3. Redeploy. `src/app/[locale]/layout.js` renders the `origin-trial` meta tag
   only when that variable exists, so local builds are unaffected.

The `tools` Permissions Policy defaults to `self`; `netlify.toml` now states it
explicitly. No CSP changes are required.
