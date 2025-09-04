import chalk from "chalk";

function getTimestamp() {
  return new Date().toISOString();
}

export function ShowInfo(message, fields = {}) {
  const messages = Array.isArray(message) ? message : [message];
  const formattedMessages = messages.map((msg) => chalk.blue(msg)).join("\n");
  const formattedFields = Object.keys(fields).length > 0 ? ` ${chalk.gray(JSON.stringify(fields))}` : "";
  console.log(`[${chalk.gray(getTimestamp())}] ${formattedMessages}${formattedFields}`);
}

export function ShowWarning(message, fields = {}) {
  const messages = Array.isArray(message) ? message : [message];
  const formattedMessages = messages.map((msg) => chalk.yellow(msg)).join("\n");
  const formattedFields = Object.keys(fields).length > 0 ? ` ${chalk.gray(JSON.stringify(fields))}` : "";
  console.log(`[${chalk.gray(getTimestamp())}] ${formattedMessages}${formattedFields}`);
}

export function ShowError(message, fields = {}) {
  const messages = Array.isArray(message) ? message : [message];
  const formattedMessages = messages.map((msg) => chalk.red(msg)).join("\n");
  const formattedFields = Object.keys(fields).length > 0 ? ` ${chalk.gray(JSON.stringify(fields))}` : "";
  console.log(`[${chalk.gray(getTimestamp())}] ${formattedMessages}${formattedFields}`);
}

export function ShowLog(message, fields = {}) {
  const messages = Array.isArray(message) ? message : [message];
  const formattedMessages = messages.map((msg) => chalk.green(msg)).join("\n");
  const formattedFields = Object.keys(fields).length > 0 ? ` ${chalk.gray(JSON.stringify(fields))}` : "";
  console.log(`[${chalk.gray(getTimestamp())}] ${formattedMessages}${formattedFields}`);
}
