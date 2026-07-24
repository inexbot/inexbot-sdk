# Version & Compatibility

This document explains the compatibility between iNexBot controller RTL versions, SDK versions, protocol ports, helping you choose the right combination before development.

---

## RTL Version Comparison

> RTL-22.07 and RTL-24.03 are both **stable versions**. Both use the same port system. RTL-24.03 is the current mainstream shipping version with more features. Documentation for both versions is continuously maintained.

| Feature | RTL-22.07 | RTL-24.03 |
|------|-----------|-----------|
| Version Status | Stable, critical bug fixes only | Stable, bug fixes + key feature merges |
| Shipment | Large installed base | **Current mainstream version** |
| Communication Format | JSON text | JSON text |
| System Features | Motion control, status, process, job files | All RTL-22.07 + system config, safety params, collaborative robot |
| Process Support | Palletizing, grinding, welding, spraying, laser, stamping, conveyor | Same as RTL-22.07, updated interfaces |
| Program Management | Job file CRUD | Instruction-level CRUD + remote program start |
| Recommended Use | Existing RTL-22.07 device maintenance | New projects, advanced features |

> Later versions (e.g. 2501) are not yet stable and SDK documentation is not available.

### Port System

Both versions use the same ports:

| Port | Protocol | Purpose | User |
|------|---------|------|--------|
| 5000 | TCP | **File transfer** (upload/download/backup) | Tools, HTTP clients |
| 6000 | JSON text | **Command communication** (usually teach pendant) | JSON protocol users (teach pendant) |
| 6001 | JSON text | **Command communication** (usually host computer) | C++/C#/Python SDK |
| 7000 | TCP | **Host computer service function port** | Host computer, tools |

> 💡 **SDK Users**: Always use **port 6001**, no manual switching needed.

### Migration Notes

When migrating from RTL-22.07 to RTL-24.03:
1. Some command words have changed — see [RTL-24.03 docs](./05.JSON-Protocol/02.RTL-24.03/)
2. SDK users need no changes — continue using port 6001
3. New features added — system config, safety parameters, collaborative robot support

---

## SDK Compiler/Runtime Compatibility

### C++ SDK

| Platform | Compiler | ABI | Architecture | Configuration |
|------|--------|-----|------|------|
| Windows | MinGW (GCC 8.3+) | MinGW ABI | x64 | Release / Debug |
| Windows | MSVC (VS 2019+) | MSVC ABI | x64 | Release / Debug |
| Linux | GCC 8.3+ | GCC ABI | x64 / ARM64 | Release |

> MinGW and MSVC libraries **cannot be mixed**. Download the SDK matching your compiler.

### C# SDK

| Platform | .NET Version | Architecture | Native Library |
|------|----------|------|--------|
| Windows | .NET 8.0 | x64 | Depends on `nrc_host.dll` |

### Python SDK

| Platform | Python Version | Architecture | Native Library |
|------|------------|------|--------|
| Windows | Contact R&D | x64 | SDK bundled native library |
| Linux | Contact R&D | x64 | `_nrc_host.so` |

---

## Related Pages

- [SDK Downloads](./12.Downloads.md) — Download SDK packages
- [Getting Started](./02.Getting-Started.md) — Choose development method
- [FAQ](./11.FAQ.md) — Troubleshooting guide
