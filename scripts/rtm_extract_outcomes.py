#!/usr/bin/env python3
import json
import re
from pathlib import Path
import xml.etree.ElementTree as ET

def main() -> int:
    xml_path = Path("test-results/results.xml")
    if not xml_path.exists():
        print("No JUnit file found at test-results/results.xml")
        return 2

    root = ET.parse(xml_path).getroot()
    key_re = re.compile(r"\b[A-Z][A-Z0-9]+-\d+\b")
    testcases = root.findall(".//testcase")

    outcomes = {}
    for tc in testcases:
        name = (tc.get("name") or "") + " " + (tc.get("classname") or "")
        keys = key_re.findall(name)
        if not keys:
            continue

        failed = (tc.find("failure") is not None) or (tc.find("error") is not None)

        for k in keys:
            prev = outcomes.get(k)
            if failed:
                outcomes[k] = "FAIL"
            else:
                if prev != "FAIL":
                    outcomes[k] = "PASS"

    Path(".rtm").mkdir(parents=True, exist_ok=True)
    Path(".rtm/outcomes.json").write_text(json.dumps(outcomes, indent=2), encoding="utf-8")
    print(f"Extracted outcomes: {len(outcomes)} -> .rtm/outcomes.json")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
