// ============================================================
// BRANDING — Single source of truth for all product strings.
// Change values here to rebrand the entire CLI.
// ============================================================

import { gradientLine } from "./colors.js";

// --- Core identity ---
export const PRODUCT_NAME = "basestack";          // Human-readable product name
export const BINARY_NAME = "basestack";            // CLI bin name (what user types)
export const NPM_PACKAGE = "basestack";            // npm package name
export const PRODUCT_TAGLINE = "Ship on Base — Idea to Base Batches";
export const PRODUCT_DESCRIPTION = "Ship on Base — skills, repos, MCPs for Base Batches";

// --- File system ---
export const CONFIG_DIR_NAME = `.${PRODUCT_NAME}`;  // ~/.basestack/
export const CONTEXT_DIR_NAME = `.${PRODUCT_NAME}`; // project-local context dir (.basestack/)

// --- Environment variables ---
export const ENV_PREFIX = PRODUCT_NAME.toUpperCase(); // BASESTACK
export const ENV_NO_BANNER = `${ENV_PREFIX}_NO_BANNER`;
export const ENV_AGENT = `${ENV_PREFIX}_AGENT`;

// --- Skill installation paths ---
export const SKILLS_NAMESPACE = PRODUCT_NAME;        // ~/.claude/skills/basestack/ (if namespaced)

// --- GitHub ---
export const GITHUB_REPO = "goheesheng/base-new";
export const GITHUB_URL = `https://github.com/${GITHUB_REPO}`;

// --- Gradient strings (pre-computed) ---
export const GRADIENT_PRODUCT = gradientLine(PRODUCT_NAME);
export const GRADIENT_PRODUCT_DASH = gradientLine(PRODUCT_NAME);

// --- ASCII banner ---
export const ASCII_ART = [
  "  ___   _   ___ ___ ___ _____ _   ___ _  __",
  " | _ ) /_\\ / __| __/ __|_   _/_\\ / __| |/ /",
  " | _ \\/ _ \\\\__ \\ _|\\__ \\ | |/ _ \\ (__| ' < ",
  " |___/_/ \\_\\___/___|___/ |_/_/ \\_\\___|_|\\_\\",
];
