[33mcommit 951d1e5c4c0f9643058f9f0c969963ff8c814c28[m[33m ([m[1;36mHEAD[m[33m -> [m[1;32mmain[m[33m, [m[1;31morigin/main[m[33m)[m
Author: DeekshithNetz <deekshithnetz@gmail.com>
Date:   Tue Aug 4 14:14:40 2026 +0530

    notification wrking

[1mdiff --git a/package-lock.json b/package-lock.json[m
[1mindex bfe2d28..83b6ebd 100644[m
[1m--- a/package-lock.json[m
[1m+++ b/package-lock.json[m
[36m@@ -17,10 +17,9 @@[m
         "@react-navigation/elements": "^2.6.3",[m
         "@react-navigation/native": "^7.1.8",[m
         "axios": "^1.18.1",[m
[31m-        "expo": "~54.0.34",[m
[32m+[m[32m        "expo": "~54.0.36",[m
         "expo-auth-session": "~7.0.11",[m
         "expo-constants": "~18.0.13",[m
[31m-        "expo-dev-client": "~6.0.21",[m
         "expo-device": "~8.0.10",[m
         "expo-font": "~14.0.11",[m
         "expo-haptics": "~15.0.8",[m
[36m@@ -52,9 +51,9 @@[m
       }[m
     },[m
     "node_modules/@0no-co/graphql.web": {[m
[31m-      "version": "1.3.2",[m
[31m-      "resolved": "https://registry.npmjs.org/@0no-co/graphql.web/-/graphql.web-1.3.2.tgz",[m
[31m-      "integrity": "sha512-Q1+pRlLhE31GOY/2c9BAEnFTNxO7Awtc6fhhEDlxyCBQ2N0IhD32cPVvPChrK9mwBNSgRdW/sF1kd2e0ojHj1Q==",[m
[32m+[m[32m      "version": "1.3.3",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@0no-co/graphql.web/-/graphql.web-1.3.3.tgz",[m
[32m+[m[32m      "integrity": "sha512-4gFGBdyaFmQ6n9euhp5JtIGS4ZeivwDr1tCPENUxTvy5wyv532yOtFCr9zzYAJh1s6uibgC+TRXUcay+mxzCoQ==",[m
       "license": "MIT",[m
       "peerDependencies": {[m
         "graphql": "^14.0.0 || ^15.0.0 || ^16.0.0"[m
[36m@@ -1321,9 +1320,9 @@[m
       }[m
     },[m
     "node_modules/@babel/plugin-transform-regenerator": {[m
[31m-      "version": "7.29.7",[m
[31m-      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-regenerator/-/plugin-transform-regenerator-7.29.7.tgz",[m
[31m-      "integrity": "sha512-rNNFV0DBAJp988xW2DOntfDoYn1eR8GGF5AT5vYc+rjyfaQkM242c9tZUHHPe7KYaiJizXPWhQTzzdbXySyhBw==",[m
[32m+[m[32m      "version": "7.29.8",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-regenerator/-/plugin-transform-regenerator-7.29.8.tgz",[m
[32m+[m[32m      "integrity": "sha512-0UpIXPtdDtMXfnV2OJAVMLpj3H/92vmkA6lpSRakmycJvj3VUy6Xs1dM8tXRugupykr5WB+LpiVl0J8LMVg2mg==",[m
       "license": "MIT",[m
       "dependencies": {[m
         "@babel/helper-plugin-utils": "^7.29.7"[m
[36m@@ -1371,9 +1370,9 @@[m
       }[m
     },[m
     "node_modules/@babel/plugin-transform-spread": {[m
[31m-      "version": "7.29.7",[m
[31m-      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-spread/-/plugin-transform-spread-7.29.7.tgz",[m
[31m-      "integrity": "sha512-/u5K1QWada7tbYNqTjMh96718g9NTwh9tfPJMsSmVsQwGT447FskV+KcfeXkXq2GWki4EM/MuTdmBec+hOuVTQ==",[m
[32m+[m[32m      "version": "7.29.8",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-spread/-/plugin-transform-spread-7.29.8.tgz",[m
[32m+[m[32m      "integrity": "sha512-4S9ksMGVWUshvgK0mKfvZky7leuG5/uoFVwMpAomJ8bMoDJiNHRVmc1EglwW/CmGVSqqWpEbXm9FmbRit22qoA==",[m
       "license": "MIT",[m
       "dependencies": {[m
         "@babel/helper-plugin-utils": "^7.29.7",[m
[36m@@ -1763,15 +1762,15 @@[m
       }[m
     },[m
     "node_modules/@expo/config": {[m
[31m-      "version": "12.0.13",[m
[31m-      "resolved": "https://registry.npmjs.org/@expo/config/-/config-12.0.13.tgz",[m
[31m-      "integrity": "sha512-Cu52arBa4vSaupIWsF0h7F/Cg//N374nYb7HAxV0I4KceKA7x2UXpYaHOL7EEYYvp7tZdThBjvGpVmr8ScIvaQ==",[m
[32m+[m[32m      "version": "12.0.14",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@expo/config/-/config-12.0.14.tgz",[m
[32m+[m[32m      "integrity": "sha512-3dfbBd9LnPDgyylhCgkOsaG8Adg52uOVOTQYH5lf23a/t8M5eQpXKCvzUarrf62B78057n2NnkiofK9TfPgvzw==",[m
       "license": "MIT",[m
       "dependencies": {[m
         "@babel/code-frame": "~7.10.4",[m
[31m-        "@expo/config-plugins": "~54.0.4",[m
[32m+[m[32m        "@expo/config-plugins": "~54.0.5",[m
         "@expo/config-types": "^54.0.10",[m
[31m-        "@expo/json-file": "^10.0.8",[m
[32m+[m[32m        "@expo/json-file": "^10.0.16",[m
         "deepmerge": "^4.3.1",[m
         "getenv": "^2.0.0",[m
         "glob": "^13.0.0",[m
[36m@@ -1784,14 +1783,14 @@[m
       }[m
     },[m
     "node_modules/@expo/config-plugins": {[m
[31m-      "version": "54.0.4",[m
[31m-      "resolved": "https://registry.npmjs.org/@expo/config-plugins/-/config-plugins-54.0.4.tgz",[m
[31m-      "integrity": "sha512-g2yXGICdoOw5i3LkQSDxl2Q5AlQCrG7oniu0pCPPO+UxGb7He4AFqSvPSy8HpRUj55io17hT62FTjYRD+d6j3Q==",[m
[32m+[m[32m      "version": "54.0.5",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@expo/config-plugins/-/config-plugins-54.0.5.tgz",[m
[32m+[m[32m      "integrity": "sha512-aWQ3sViNRoQWw6So4A2qhWCt24CuGBK6MrRHI1AG+V6/NQAjIZCHaSvcXK2gXKpmisRhTSUWaKPIgLJQFB+AeQ==",[m
       "license": "MIT",[m
       "dependencies": {[m
         "@expo/config-types": "^54.0.10",[m
[31m-        "@expo/json-file": "~10.0.8",[m
[31m-        "@expo/plist": "^0.4.8",[m
[32m+[m[32m        "@expo/json-file": "~10.0.16",[m
[32m+[m[32m        "@expo/plist": "^0.4.9",[m
         "@expo/sdk-runtime-versions": "^1.0.0",[m
         "chalk": "^4.1.2",[m
         "debug": "^4.3.5",[m
[36m@@ -1904,9 +1903,9 @@[m
       }[m
     },[m
     "node_modules/@expo/env": {[m
[31m-      "version": "2.0.11",[m
[31m-      "resolved": "https://registry.npmjs.org/@expo/env/-/env-2.0.11.tgz",[m
[31m-      "integrity": "sha512-xV+ps6YCW7XIPVUwFVCRN2nox09dnRwy8uIjwHWTODu0zFw4kp4omnVkl0OOjuu2XOe7tdgAHxikrkJt9xB/7Q==",[m
[32m+[m[32m      "version": "2.0.12",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@expo/env/-/env-2.0.12.tgz",[m
[32m+[m[32m      "integrity": "sha512-wVfzeBGlUohZG5kS8QCqXurpuWZFJEkBB1wXCifai3EZ/Llcg/VMTiUCpAgHImD3lI7GIU3V1uI64c04XIo98Q==",[m
       "license": "MIT",[m
       "dependencies": {[m
         "chalk": "^4.0.0",[m
[36m@@ -2069,9 +2068,9 @@[m
       }[m
     },[m
     "node_modules/@expo/osascript": {[m
[31m-      "version": "2.7.0",[m
[31m-      "resolved": "https://registry.npmjs.org/@expo/osascript/-/osascript-2.7.0.tgz",[m
[31m-      "integrity": "sha512-wKIXL8UtbuX4KwavPasIW3CUcgTbYfjzLcgUhjyKUAYDEqMaf6gmU1bqz3ffBPTokmX+G8/vFG1ZuI9etQWukA==",[m
[32m+[m[32m      "version": "2.7.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@expo/osascript/-/osascript-2.7.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-Zn03EX6In7ts2lPUW2ESUSkEhEWQN1qqsiXjadtZMJOuZRkMiAg1ZQHuvz9DjByDWNJ2pBwAGyrts9lj9k389g==",[m
       "license": "MIT",[m
       "dependencies": {[m
         "@expo/spawn-async": "^1.8.0"[m
[36m@@ -2081,12 +2080,12 @@[m
       }[m
     },[m
     "node_modules/@expo/package-manager": {[m
[31m-      "version": "1.13.0",[m
[31m-      "resolved": "https://registry.npmjs.org/@expo/package-manager/-/package-manager-1.13.0.tgz",[m
[31m-      "integrity": "sha512-s3W3eZafJDEyVL7W/jxj2Nz3eONKxSCU604S5xj8ijrVaRz83x0DnZznLf/UXQEI1w+FyibH68nHeQyk767b1A==",[m
[32m+[m[32m      "version": "1.13.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@expo/package-manager/-/package-manager-1.13.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-y/K+CaYYpZpNGZhSX4HyLT/vyIunFjNfyoxNysPBCefeLKI/VCx6f9LNPzrxayr3rCYO5bl9O8H+HRQK265Nkg==",[m
       "license": "MIT",[m
       "dependencies": {[m
[31m-        "@expo/json-file": "^11.0.0",[m
[32m+[m[32m        "@expo/json-file": "^11.0.1",[m
         "@expo/spawn-async": "^1.8.0",[m
         "chalk": "^4.0.0",[m
         "npm-package-arg": "^11.0.0",[m
[36m@@ -2095,9 +2094,9 @@[m
       }[m
     },[m
     "node_modules/@expo/package-manager/node_modules/@expo/json-file": {[m
[31m-      "version": "11.0.0",[m
[31m-      "resolved": "https://registry.npmjs.org/@expo/json-file/-/json-file-11.0.0.tgz",[m
[31m-      "integrity": "sha512-pHJCETqFL5x5BzNV6cEPwjwuECgGmnl0bNmfHIJ6LM1tlh2eVXi5HEdit3zby/JO/B8Otk5cgcqtJXgvvUat3A==",[m
[32m+[m[32m      "version": "11.0.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@expo/json-file/-/json-file-11.0.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-zxHWj4MKKMAL29ZQSY/Fssx4Thluk40JmuGNaeS078wy/NhlFhnVi+rHHunulE3xJAJ0CM73m8VK2+GkF9eRwQ==",[m
       "license": "MIT",[m
       "dependencies": {[m
         "@babel/code-frame": "^7.20.0",[m
[36m@@ -2168,9 +2167,9 @@[m
       }[m
     },[m
     "node_modules/@expo/schema-utils": {[m
[31m-      "version": "0.1.8",[m
[31m-      "resolved": "https://registry.npmjs.org/@expo/schema-utils/-/schema-utils-0.1.8.tgz",[m
[31m-      "integrity": "sha512-9I6ZqvnAvKKDiO+ZF8BpQQFYWXOJvTAL5L/227RUbWG1OVZDInFifzCBiqAZ3b67NRfeAgpgvbA7rejsqhY62A==",[m
[32m+[m[32m      "version": "0.1.9",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@expo/schema-utils/-/schema-utils-0.1.9.tgz",[m
[32m+[m[32m      "integrity": "sha512-t9bYwG4Z0yCVzHYJoDMci1OFq2FkBkhStlfUGSkspKYTwB/84+x6sY+CXCgdhkQNQtvWaugW5KUs9YZfAXq9Sg==",[m
       "license": "MIT"[m
     },[m
     "node_modules/@expo/sdk-runtime-versions": {[m
[36m@@ -7035,22 +7034,22 @@[m
       }[m
     },[m
     "node_modules/expo": {[m
[31m-      "version": "54.0.35",[m
[31m-      "resolved": "https://registry.npmjs.org/expo/-/expo-54.0.35.tgz",[m
[31m-      "integrity": "sha512-E+tXpQwjGm5fK/uwa55p0Xx/kuo5dXDKfVJ95IargTNa5KiFt26lSTXXa9KnHbI4EDLwFD38/xTKZvzPTlGTdg==",[m
[32m+[m[32m      "version": "54.0.36",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/expo/-/expo-54.0.36.tgz",[m
[32m+[m[32m      "integrity": "sha512-HMHp1H+actmnX85NJE6lILKzSJV6pTDNkwghq9EMOP3zTynjvBYVqJGSLlm6sEVzJCC5Z2ZiKgLvtsHrqlY0dg==",[m
       "license": "MIT",[m
       "dependencies": {[m
         "@babel/runtime": "^7.20.0",[m
[31m-        "@expo/cli": "54.0.25",[m
[31m-        "@expo/config": "~12.0.13",[m
[31m-        "@expo/config-plugins": "~54.0.4",[m
[32m+[m[32m        "@expo/cli": "54.0.26",[m
[32m+[m[32m        "@expo/config": "~12.0.14",[m
[32m+[m[32m        "@expo/config-plugins": "~54.0.5",[m
         "@expo/devtools": "0.1.8",[m
         "@expo/fingerprint": "0.15.5",[m
         "@expo/metro": "~54.2.0",[m
[31m-        "@expo/metro-config": "54.0.16",[m
[32m+[m[32m        "@expo/metro-config": "54.0.17",[m
         "@expo/vector-icons": "^15.0.3",[m
         "@ungap/structured-clone": "^1.3.0",[m
[31m-        "babel-preset-expo": "~54.0.11",[m
[32m+[m[32m        "babel-preset-expo": "~54.0.12",[m
         "expo-asset": "~12.0.13",[m
         "expo-constants": "~18.0.13",[m
         "expo-file-system": "~19.0.23",[m
[36m@@ -7139,79 +7138,6 @@[m
         "react-native": "*"[m
       }[m
     },[m
[31m-    "node_modules/expo-dev-client": {[m
[31m-      "version": "6.0.21",[m
[31m-      "resolved": "https://registry.npmjs.org/expo-dev-client/-/expo-dev-client-6.0.21.tgz",[m
[31m-      "integrity": "sha512-SWI6HD0pa4eJujkYFkvvpezUE1zmJXGLu+34azpu7+QJgO+FLutDYDj8BSTdeH/NYDEClDFjCGqVMcWETvmsCQ==",[m
[31m-      "license": "MIT",[m
[31m-      "dependencies": {[m
[31m-        "expo-dev-launcher": "6.0.21",[m
[31m-        "expo-dev-menu": "7.0.19",[m
[31m-        "expo-dev-menu-interface": "2.0.0",[m
[31m-        "expo-manifests": "~1.0.11",[m
[31m-        "expo-updates-interface": "~2.0.0"[m
[31m-      },[m
[31m-      "peerDependencies": {[m
[31m-        "expo": "*"[m
[31m-      }[m
[31m-    },[m
[31m-    "node_modules/expo-dev-launcher": {[m
[31m-      "version": "6.0.21",[m
[31m-      "resolved": "https://registry.npmjs.org/expo-dev-launcher/-/expo-dev-launcher-6.0.21.tgz",[m
[31m-      "integrity": "sha512-QZ9gcKMZbp6EsIhzS0QoGB8Cf4xeVJhjbNgWUwcoBIk8gshoFz8CkCQOnX+HNv2sSY3rdCaNpx3Xo0Rflyq7rA==",[m
[31m-      "license": "MIT",[m
[31m-      "dependencies": {[m
[31m-        "ajv": "^8.11.0",[m
[31m-        "expo-dev-menu": "7.0.19",[m
[31m-        "expo-manifests": "~1.0.11"[m
[31m-      },[m
[31m-      "peerDependencies": {[m
[31m-        "expo": "*"[m
[31m-      }[m
[31m-    },[m
[31m-    "node_modules/expo-dev-launcher/node_modules/ajv": {[m
[31m-      "version": "8.20.0",[m
[31m-      "resolved": "https://registry.npmjs.org/ajv/-/ajv-8.20.0.tgz",[m
[31m-      "integrity": "sha512-Thbli+OlOj+iMPYFBVBfJ3OmCAnaSyNn4M1vz9T6Gka5Jt9ba/HIR56joy65tY6kx/FCF5VXNB819Y7/GUrBGA==",[m
[31m-      "license": "MIT",[m
[31m-      "dependencies": {[m
[31m-        "fast-deep-equal": "^3.1.3",[m
[31m-        "fast-uri": "^3.0.1",[m
[31m-        "json-schema-traverse": "^1.0.0",[m
[31m-        "require-from-string": "^2.0.2"[m
[31m-      },[m
[31m-      "funding": {[m
[31m-        "type": "github",[m
[31m-        "url": "https://github.com/sponsors/epoberezkin"[m
[31m-      }[m
[31m-    },[m
[31m-    "node_modules/expo-dev-launcher/node_modules/json-schema-traverse": {[m
[31m-      "version": "1.0.0",[m
[31m-      "resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-1.0.0.tgz",[m
[31m-      "integrity": "sha512-NM8/P9n3XjXhIZn1lLhkFaACTOURQXjWhV4BA/RnOv8xvgqtqpAX9IO4mRQxSx1Rlo4tqzeqb0sOlruaOy3dug==",[m
[31m-      "license": "MIT"[m
[31m-    },[m
[31m-    "node_modules/expo-dev-menu": {[m
[31m-      "version": "7.0.19",[m
[31m-      "resolved": "https://registry.npmjs.org/expo-dev-menu/-/expo-dev-menu-7.0.19.tgz",[m
[31m-      "integrity": "sha512-ju5MZiBCPhUKKvHy0ElZdnlhq01mkEEiR8jfrgQVvW26aWjzjLiOhppNAyXtvGbhk7WxJim3wYMiqFFrjGdfKA==",[m
[31m-      "license": "MIT",[m
[31m-      "dependencies": {[m
[31m-        "expo-dev-menu-interface": "2.0.0"[m
[31m-      },[m
[31m-      "peerDependencies": {[m
[31m-        "expo": "*"[m
[31m-      }[m
[31m-    },[m
[31m-    "node_modules/expo-dev-menu-interface": {[m
[31m-      "version": "2.0.0",[m
[31m-      "resolved": "https://registry.npmjs.org/expo-dev-menu-interface/-/expo-dev-menu-interface-2.0.0.tgz",[m
[31m-      "integrity": "sha512-BvAMPt6x+vyXpThsyjjOYyjwfjREV4OOpQkZ0tNl+nGpsPfcY9mc6DRACoWnH9KpLzyIt3BOgh3cuy/h/OxQjw==",[m
[31m-      "license": "MIT",[m
[31m-      "peerDependencies": {[m
[31m-        "expo": "*"[m
[31m-      }[m
[31m-    },[m
     "node_modules/expo-device": {[m
       "version": "8.0.10",[m
       "resolved": "https://registry.npmjs.org/expo-device/-/expo-device-8.0.10.tgz",[m
[36m@@ -7290,12 +7216,6 @@[m
         }[m
       }[m
     },[m
[31m-    "node_modules/expo-json-utils": {[m
[31m-      "version": "0.15.0",[m
[31m-      "resolved": "https://registry.npmjs.org/expo-json-utils/-/expo-json-utils-0.15.0.tgz",[m
[31m-      "integrity": "sha512-duRT6oGl80IDzH2LD2yEFWNwGIC2WkozsB6HF3cDYNoNNdUvFk6uN3YiwsTsqVM/D0z6LEAQ01/SlYvN+Fw0JQ==",[m
[31m-      "license": "MIT"[m
[31m-    },[m
     "node_modules/expo-linking": {[m
       "version": "8.0.12",[m
       "resolved": "https://registry.npmjs.org/expo-linking/-/expo-linking-8.0.12.tgz",[m
[36m@@ -7310,19 +7230,6 @@[m
         "react-native": "*"[m
       }[m
     },[m
[31m-    "node_modules/expo-manifests": {[m
[31m-      "version": "1.0.11",[m
[31m-      "resolved": "https://registry.npmjs.org/expo-manifests/-/expo-manifests-1.0.11.tgz",[m
[31m-      "integrity": "sha512-6zItytTewN37Cjhp3glUg0ozrgW2GwB8x9wtfzUNoJIMmxO38nnGdTLMaotYhRqdf5PP2Dzdmej1HDHXVNUpRw==",[m
[31m-      "license": "MIT",[m
[31m-      "dependencies": {[m
[31m-        "@expo/config": "~12.0.13",[m
[31m-        "expo-json-utils": "~0.15.0"[m
[31m-      },[m
[31m-      "peerDependencies": {[m
[31m-        "expo": "*"[m
[31m-      }[m
[31m-    },[m
     "node_modules/expo-modules-autolinking": {[m
       "version": "3.0.26",[m
       "resolved": "https://registry.npmjs.org/expo-modules-autolinking/-/expo-modules-autolinking-3.0.26.tgz",[m
[36m@@ -7708,15 +7615,6 @@[m
         }[m
       }[m
     },[m
[31m-    "node_modules/expo-updates-interface": {[m
[31m-      "version": "2.0.0",[m
[31m-      "resolved": "https://registry.npmjs.org/expo-updates-interface/-/expo-updates-interface-2.0.0.tgz",[m
[31m-      "integrity": "sha512-pTzAIufEZdVPKql6iMi5ylVSPqV1qbEopz9G6TSECQmnNde2nwq42PxdFBaUEd8IZJ/fdJLQnOT3m6+XJ5s7jg==",[m
[31m-      "license": "MIT",[m
[31m-      "peerDependencies": {[m
[31m-        "expo": "*"[m
[31m-      }[m
[31m-    },[m
     "node_modules/expo-web-browser": {[m
       "version": "15.0.11",[m
       "resolved": "https://registry.npmjs.org/expo-web-browser/-/expo-web-browser-15.0.11.tgz",[m
[36m@@ -7728,26 +7626,26 @@[m
       }[m
     },[m
     "node_modules/expo/node_modules/@expo/cli": {[m
[31m-      "version": "54.0.25",[m
[31m-      "resolved": "https://registry.npmjs.org/@expo/cli/-/cli-54.0.25.tgz",[m
[31m-      "integrity": "sha512-WnUqIb8oMBhtwSfIqdCHCzcaDIpLNXItRVd5miuvWi4GO0SGo89PSsAkbVJ+LJgcaY+v5rbgMELJS9I/CqOulA==",[m
[32m+[m[32m      "version": "54.0.26",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@expo/cli/-/cli-54.0.26.tgz",[m
[32m+[m[32m      "integrity": "sha512-BjsAoKINLEo3LRE+sDC6FCgjxuOWsyfOFOKz0txrbEcxSatzIjJDVuX8XaTdmeicZdcoN524yl1sfwCWfxhYMw==",[m
       "license": "MIT",[m
       "dependencies": {[m
         "@0no-co/graphql.web": "^1.0.8",[m
         "@expo/code-signing-certificates": "^0.0.6",[m
[31m-        "@expo/config": "~12.0.13",[m
[31m-        "@expo/config-plugins": "~54.0.4",[m
[32m+[m[32m        "@expo/config": "~12.0.14",[m
[32m+[m[32m        "@expo/config-plugins": "~54.0.5",[m
         "@expo/devcert": "^1.2.1",[m
[31m-        "@expo/env": "~2.0.8",[m
[32m+[m[32m        "@expo/env": "~2.0.12",[m
         "@expo/image-utils": "^0.8.8",[m
         "@expo/json-file": "^10.0.16",[m
         "@expo/metro": "~54.2.0",[m
[31m-        "@expo/metro-config": "~54.0.16",[m
[32m+[m[32m        "@expo/metro-config": "~54.0.17",[m
         "@expo/osascript": "^2.3.8",[m
         "@expo/package-manager": "^1.9.10",[m
         "@expo/plist": "^0.4.9",[m
[31m-        "@expo/prebuild-config": "^54.0.8",[m
[31m-        "@expo/schema-utils": "^0.1.8",[m
[32m+[m[32m        "@expo/prebuild-config": "^54.0.9",[m
[32m+[m[32m        "@expo/schema-utils": "^0.1.9",[m
         "@expo/spawn-async": "^1.7.2",[m
         "@expo/ws-tunnel": "^1.0.1",[m
         "@expo/xcpretty": "^4.3.0",[m
[36m@@ -7814,6 +7712,27 @@[m
         }[m
       }[m
     },[m
[32m+[m[32m    "node_modules/expo/node_modules/@expo/cli/node_modules/@expo/prebuild-config": {[m
[32m+[m[32m      "version": "54.0.9",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@expo/prebuild-config/-/prebuild-config-54.0.9.tgz",[m
[32m+[m[32m      "integrity": "sha512-3/Rmyzt8vduPjnSVHbnc0wYFrlhwLWn2g596rDyKcLGeqN2WTLJbzVeznsrUwyzhBNXgnTomZWO5HDzbZ/4E7g==",[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "@expo/config": "~12.0.14",[m
[32m+[m[32m        "@expo/config-plugins": "~54.0.5",[m
[32m+[m[32m        "@expo/config-types": "^54.0.10",[m
[32m+[m[32m        "@expo/image-utils": "^0.8.8",[m
[32m+[m[32m        "@expo/json-file": "^10.0.16",[m
[32m+[m[32m        "@react-native/normalize-colors": "0.81.5",[m
[32m+[m[32m        "debug": "^4.3.1",[m
[32m+[m[32m        "resolve-from": "^5.0.0",[m
[32m+[m[32m        "semver": "^7.6.0",[m
[32m+[m[32m        "xml2js": "0.6.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "peerDependencies": {[m
[32m+[m[32m        "expo": "*"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/expo/node_modules/@expo/json-file": {[m
       "version": "10.0.16",[m
       "resolved": "https://registry.npmjs.org/@expo/json-file/-/json-file-10.0.16.tgz",[m
[36m@@ -7834,16 +7753,16 @@[m
       }[m
     },[m
     "node_modules/expo/node_modules/@expo/metro-config": {[m
[31m-      "version": "54.0.16",[m
[31m-      "resolved": "https://registry.npmjs.org/@expo/metro-config/-/metro-config-54.0.16.tgz",[m
[31m-      "integrity": "sha512-3LLb9ZQl0VlqSlsalJ7+CYjfz60PBoSDHvpE1UF71aTM1Nx0Vb4LhXo7bCCC+PYP9q/GPB58LLbIROQ8PjKX2w==",[m
[32m+[m[32m      "version": "54.0.17",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@expo/metro-config/-/metro-config-54.0.17.tgz",[m
[32m+[m[32m      "integrity": "sha512-PQFgQCZGY0DffZUvBzJttDPreZfHrQakaBlKjnvOUMNXbDna+TYmg1IFZuIDUYJezLcdp+TvVFTLjNi1+mqaVw==",[m
       "license": "MIT",[m
       "dependencies": {[m
         "@babel/code-frame": "^7.20.0",[m
         "@babel/core": "^7.20.0",[m
         "@babel/generator": "^7.20.5",[m
[31m-        "@expo/config": "~12.0.13",[m
[31m-        "@expo/env": "~2.0.8",[m
[32m+[m[32m        "@expo/config": "~12.0.14",[m
[32m+[m[32m        "@expo/env": "~2.0.12",[m
         "@expo/json-file": "~10.0.16",[m
         "@expo/metro": "~54.2.0",[m
         "@expo/spawn-async": "^1.7.2",[m
[36m@@ -7871,9 +7790,9 @@[m
       }[m
     },[m
     "node_modules/expo/node_modules/babel-preset-expo": {[m
[31m-      "version": "54.0.11",[m
[31m-      "resolved": "https://registry.npmjs.org/babel-preset-expo/-/babel-preset-expo-54.0.11.tgz",[m
[31m-      "integrity": "sha512-dEpeFDtYEFzmWtWVwvt7sUCZH0fxXPfbJlgXd7XNZSQDa/Ki/hTOj9exMTzqR2oyPHDNcE9VxYCJ4oS6xw4Pjg==",[m
[32m+[m[32m      "version": "54.0.12",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/babel-preset-expo/-/babel-preset-expo-54.0.12.tgz",[m
[32m+[m[32m      "integrity": "sha512-6xeSkdaixmQhWSYL7tfLu0pOS0BY+8ftwmdNSHtpEFSizrXYZkCjk/B6Dxr+6nwNRihixMcS0aBlWS1wlDl3pw==",[m
       "license": "MIT",[m
       "dependencies": {[m
         "@babel/helper-module-imports": "^7.25.9",[m
[36m@@ -7914,9 +7833,9 @@[m
       }[m
     },[m
     "node_modules/expo/node_modules/brace-expansion": {[m
[31m-      "version": "2.1.2",[m
[31m-      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-2.1.2.tgz",[m
[31m-      "integrity": "sha512-w5JZcKgdhDOgOwm8H+KgbosopHMuGcl6qbulwjtz3SM7I7P3yW1eAjzMPLrIE+NQ9vjgANKHWeMHnrT0OXW1oA==",[m
[32m+[m[32m      "version": "2.1.4",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-2.1.4.tgz",[m
[32m+[m[32m      "integrity": "sha512-hGfVzPxthbf3+2yjg/RBs60cB0FhqBS/zvdV/4wn4/BmN0bNMMHPc4V/BbFieqf1TKAGGAHnY4eSjajCl0f2Xg==",[m
       "license": "MIT",[m
       "dependencies": {[m
         "balanced-match": "^1.0.0"[m
[36m@@ -8048,9 +7967,9 @@[m
       }[m
     },[m
     "node_modules/expo/node_modules/ws": {[m
[31m-      "version": "8.21.0",[m
[31m-      "resolved": "https://registry.npmjs.org/ws/-/ws-8.21.0.tgz",[m
[31m-      "integrity": "sha512-Vsp28b7DRcimFQvrqu2Wek3z1iYxDCWqHYB8Qsnk/S4RfaCQzPGPyBNuVjJV3cd6UiKtUtp6sNM77gWvzcCH+g==",[m
[32m+[m[32m      "version": "8.21.2",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/ws/-/ws-8.21.2.tgz",[m
[32m+[m[32m      "integrity": "sha512-54dMVAo4WIe6SKy3vBgN+9bJZqqQ8IMRevAkOLQALhi49qkkQDQfWdAZ8KQlXiEabw88ARXXdUrlvtbKQX+aKw==",[m
       "license": "MIT",[m
       "engines": {[m
         "node": ">=10.0.0"[m
[36m@@ -8093,22 +8012,6 @@[m
       "dev": true,[m
       "license": "MIT"[m
     },[m
[31m-    "node_modules/fast-uri": {[m
[31m-      "version": "3.1.3",[m
[31m-      "resolved": "https://registry.npmjs.org/fast-uri/-/fast-uri-3.1.3.tgz",[m
[31m-      "integrity": "sha512-i70LwGWUduXqzicKXWshooq+sWL1K3WUU5rKZNG/0i3a1OSoX3HqhH5WbWwTmqWfor4urUakGPiRQcleRZTwOg==",[m
[31m-      "funding": [[m
[31m-        {[m
[31m-          "type": "github",[m
[31m-          "url": "https://github.com/sponsors/fastify"[m
[31m-        },[m
[31m-        {[m
[31m-          "type": "opencollective",[m
[31m-          "url": "https://opencollective.com/fastify"[m
[31m-        }[m
[31m-      ],[m
[31m-      "license": "BSD-3-Clause"[m
[31m-    },[m
     "node_modules/faye-websocket": {[m
       "version": "0.11.4",[m
       "resolved": "https://registry.npmjs.org/faye-websocket/-/faye-websocket-0.11.4.tgz",[m
[36m@@ -9929,9 +9832,9 @@[m
       "license": "MIT"[m
     },[m
     "node_modules/lightningcss": {[m
[31m-      "version": "1.32.0",[m
[31m-      "resolved": "https://registry.npmjs.org/lightningcss/-/lightningcss-1.32.0.tgz",[m
[31m-      "integrity": "sha512-NXYBzinNrblfraPGyrbPoD19C1h9lfI/1mzgWYvXUTe414Gz/X1FD2XBZSZM7rRTrMA8JL3OtAaGifrIKhQ5yQ==",[m
[32m+[m[32m      "version": "1.33.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/lightningcss/-/lightningcss-1.33.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-WkUDrojuJs0xkgGf2udWxa3yGBRxPtxUkB79i6aCZLRgc7PM8fZe9TosfPDcvEpQZbuFASnHYmRLBLUbmLOIIA==",[m
       "license": "MPL-2.0",[m
       "dependencies": {[m
         "detect-libc": "^2.0.3"[m
[36m@@ -9944,23 +9847,23 @@[m
         "url": "https://opencollective.com/parcel"[m
       },[m
       "optionalDependencies": {[m
[31m-        "lightningcss-android-arm64": "1.32.0",[m
[31m-        "lightningcss-darwin-arm64": "1.32.0",[m
[31m-        "lightningcss-darwin-x64": "1.32.0",[m
[31m-        "lightningcss-freebsd-x64": "1.32.0",[m
[31m-        "lightningcss-linux-arm-gnueabihf": "1.32.0",[m
[31m-        "lightningcss-linux-arm64-gnu": "1.32.0",[m
[31m-        "lightningcss-linux-arm64-musl": "1.32.0",[m
[31m-        "lightningcss-linux-x64-gnu": "1.32.0",[m
[31m-        "lightningcss-linux-x64-musl": "1.32.0",[m
[31m-        "lightningcss-win32-arm64-msvc": "1.32.0",[m
[31m-        "lightningcss-win32-x64-msvc": "1.32.0"[m
[32m+[m[32m        "lightningcss-android-arm64": "1.33.0",[m
[32m+[m[32m        "lightningcss-darwin-arm64": "1.33.0",[m
[32m+[m[32m        "lightningcss-darwin-x64": "1.33.0",[m
[32m+[m[32m        "lightningcss-freebsd-x64": "1.33.0",[m
[32m+[m[32m        "lightningcss-linux-arm-gnueabihf": "1.33.0",[m
[32m+[m[32m        "lightningcss-linux-arm64-gnu": "1.33.0",[m
[32m+[m[32m        "lightningcss-linux-arm64-musl": "1.33.0",[m
[32m+[m[32m        "lightningcss-linux-x64-gnu": "1.33.0",[m
[32m+[m[32m        "lightningcss-linux-x64-musl": "1.33.0",[m
[32m+[m[32m        "lightningcss-win32-arm64-msvc": "1.33.0",[m
[32m+[m[32m        "lightningcss-win32-x64-msvc": "1.33.0"[m
       }[m
     },[m
     "node_modules/lightningcss-android-arm64": {[m
[31m-      "version": "1.32.0",[m
[31m-      "resolved": "https://registry.npmjs.org/lightningcss-android-arm64/-/lightningcss-android-arm64-1.32.0.tgz",[m
[31m-      "integrity": "sha512-YK7/ClTt4kAK0vo6w3X+Pnm0D2cf2vPHbhOXdoNti1Ga0al1P4TBZhwjATvjNwLEBCnKvjJc2jQgHXH0NEwlAg==",[m
[32m+[m[32m      "version": "1.33.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/lightningcss-android-arm64/-/lightningcss-android-arm64-1.33.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-gEpRTalKdosp4Bb8qWtc2iOgE5SeIHlpS1up9bFq2wAyYhl1UdTObYiHe98zEM9SQvSoqQZ1IQD0JNpg3Ml5pg==",[m
       "cpu": [[m
         "arm64"[m
       ],[m
[36m@@ -9978,9 +9881,9 @@[m
       }[m
     },[m
     "node_modules/lightningcss-darwin-arm64": {[m
[31m-      "version": "1.32.0",[m
[31m-      "resolved": "https://registry.npmjs.org/lightningcss-darwin-arm64/-/lightningcss-darwin-arm64-1.32.0.tgz",[m
[31m-      "integrity": "sha512-RzeG9Ju5bag2Bv1/lwlVJvBE3q6TtXskdZLLCyfg5pt+HLz9BqlICO7LZM7VHNTTn/5PRhHFBSjk5lc4cmscPQ==",[m
[32m+[m[32m      "version": "1.33.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/lightningcss-darwin-arm64/-/lightningcss-darwin-arm64-1.33.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-Sciaz8eenNTKn9b3t7+xr0ipTp9YxKQY4npwQ3mrRuL0BAVHBLyZxofhaKBAVtzmtRZ/zTyo0/to4B1uWG/Djg==",[m
       "cpu": [[m
         "arm64"[m
       ],[m
[36m@@ -9998,9 +9901,9 @@[m
       }[m
     },[m
     "node_modules/lightningcss-darwin-x64": {[m
[31m-      "version": "1.32.0",[m
[31m-      "resolved": "https://registry.npmjs.org/lightningcss-darwin-x64/-/lightningcss-darwin-x64-1.32.0.tgz",[m
[31m-      "integrity": "sha512-U+QsBp2m/s2wqpUYT/6wnlagdZbtZdndSmut/NJqlCcMLTWp5muCrID+K5UJ6jqD2BFshejCYXniPDbNh73V8w==",[m
[32m+[m[32m      "version": "1.33.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/lightningcss-darwin-x64/-/lightningc