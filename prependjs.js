/**
 * 配置中的规则 "config.rules" 与 "config.rule-providers"
 * 通过合并的方式注入自定义条目
 */

// 需要前置的自定义规则
const prependRules = [
  "DOMAIN-SUFFIX,baidu.com,DIRECT",
  "RULE-SET,my-anthropic,🤖 AI 服务",
];

// 需要追加的 rule-providers
const prependRuleProviders = {
  "my-anthropic": {
    type: "http",
    behavior: "classical",
    format: "yaml",
    url: "https://raw.githubusercontent.com/est7/anthropic-claude-rules-set/main/my-anthropic.yaml",
    path: "./ruleset/my-anthropic.yaml",
    interval: 86400,
  },
};

function main(config) {
  // 合并 rules：自定义规则放在最前
  const oldRules = config["rules"] || [];
  config["rules"] = prependRules.concat(oldRules);

  // 自定义 providers 放在前面：先铺自定义，再合并旧的（旧的同名不会覆盖自定义）
  const oldRuleProviders = config["rule-providers"] || {};
  config["rule-providers"] = Object.assign(
    {},
    prependRuleProviders,
    oldRuleProviders,
  );

  return config;
}
