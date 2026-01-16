# Execution Scripts

This folder contains deterministic Python scripts that handle the actual work.

## Principles

1. **Reliable**: Scripts should produce consistent outputs for the same inputs
2. **Testable**: Include error handling and clear success/failure states
3. **Fast**: Optimize for performance where possible
4. **Well-Commented**: Document what each section does

## Script Template

```python
"""
script_name.py

Description: Brief description of what this script does.

Inputs:
    - arg1: Description
    - arg2: Description

Outputs:
    - Description of output

Usage:
    python script_name.py --arg1 value --arg2 value
"""

import os
import argparse
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


def main():
    """Main execution function."""
    parser = argparse.ArgumentParser(description="Script description")
    parser.add_argument("--arg1", required=True, help="Argument 1 description")
    args = parser.parse_args()
    
    # Your logic here
    print(f"Processing: {args.arg1}")


if __name__ == "__main__":
    main()
```
