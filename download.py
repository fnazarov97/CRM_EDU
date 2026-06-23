import os
import urllib.request
import ssl

# Bypass SSL verification if needed, although standard certificate verification should work
ssl._create_default_https_context = ssl._create_unverified_context

# Target directories
screenshots_dir = 'screenshots'
os.makedirs(screenshots_dir, exist_ok=True)

screens = [
    {
        "id": "0ac5e07e6b1d40b390a25876ddaea11d",
        "name": "guruhlar_boshqaruvi",
        "html_url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzI0NDFkZDllZmI5OTRjNzNhMmUyNDE1NjYyY2M2ODQ5EgsSBxCjr6Lp_x0YAZIBIwoKcHJvamVjdF9pZBIVQhMyMjE5MDk3MDY3NzY1MjU4MzQ4&filename=&opi=89354086",
        "screenshot_url": "https://lh3.googleusercontent.com/aida/AP1WRLv7vSxI-sTIFTYMXS-qOf5nNYruOHDysuT6mO3Wx_XXMNGqEvztEl3seI8CJDEAnpWHn9d_G2P1P7vbykd5GS95v0qaha51rtONZRd-vYZIs9JatUEbM6BTipT3hDotQfBBN9n6xuhrtLt-olVdNluZcJ8VnghbI4tV8Ybzv3JFvkIg-IdAfzNJCOx3hohSFqIKlmdnE7dbkrvkyg2cOgfU9qgiKOeODomR6Ed21bMemRvcotyve1CZh4I"
    },
    {
        "id": "303455fc68584ad389d257715fc440b1",
        "name": "tizimga_kirish",
        "html_url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2NkNTljODk3ZmZhZjQ4ZGNiYTgzZTc5M2ExMDQxOWMwEgsSBxCjr6Lp_x0YAZIBIwoKcHJvamVjdF9pZBIVQhMyMjE5MDk3MDY3NzY1MjU4MzQ4&filename=&opi=89354086",
        "screenshot_url": "https://lh3.googleusercontent.com/aida/AP1WRLt5SEDJDBU4A7fZJWlslgPOliMbGLkg1R82YVRwVoZ8ssm8k5aEkGCy2_479NVo09y-FjOPhAd0qF4tI6CoLIp2hVOqlg7df2SyqwZja-9bQzagVsdvc_mfO-sFAh9zgz_Mh-RxTpwHiz_MKEzlpFIEIjyIQ54PCatJ_Kok8F1P9FT8jw1RUvXyqY8v0v2vdkRZIqfEgEnLZ9kLPCIpwFD4lnl_-mhE0bQDSp5BP0-zWsHeyoIsGuXPSZw"
    },
    {
        "id": "31322b61743c45048e58868c427d3150",
        "name": "leadlar_boshqaruvi",
        "html_url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzBiNWQyZjBjYTY1ZjRlODk4MGRlZTllZDU5YjA3MmEwEgsSBxCjr6Lp_x0YAZIBIwoKcHJvamVjdF9pZBIVQhMyMjE5MDk3MDY3NzY1MjU4MzQ4&filename=&opi=89354086",
        "screenshot_url": "https://lh3.googleusercontent.com/aida/AP1WRLvnfdVukKBsmyFmuPhg9Amt9YiW3IZylAq2o_DJ1yGY7QFbzQ1abZj3540GquzSfu4o5Lt3bbC0lZ42NAATX34fXHc-PBeXbC6PMsXKBeC-JTd0c8_4VPlt4NaeasIz_Di_QPzpWaVqgwMQR9ORZ1wMlsknLDkOLTwKrsXslPbE23s7aSZzzgL4M4FMg3GG4jLWSKI8mNsc6bfUNj6OtnWlMzhjADPsl7kwPPK-Z2alHDAwVPOpHnq2ZLU"
    },
    {
        "id": "476f341b435d4f83855045455068630b",
        "name": "kurslar_royxati",
        "html_url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2RiZjRmM2YzMTgzZDQyYzY5YzdkMWZjNzU5MTY4MTY5EgsSBxCjr6Lp_x0YAZIBIwoKcHJvamVjdF9pZBIVQhMyMjE5MDk3MDY3NzY1MjU4MzQ4&filename=&opi=89354086",
        "screenshot_url": "https://lh3.googleusercontent.com/aida/AP1WRLuEtOTSN_hTIcSelWJCe5FbOjywPE6kVpwM3n1rmdyJTCvpRNO8DPu72YAjyWk7gjwfFyU_x83ItFSk_cqqQR8OOwfGjrnbq1vxo-AohyX_xV4Lf5SSwbOU4I12VcF4WZiuYTgoqtdfK3MjgqT67pvBfau0ElASB2dSH4RlxKtD72cLRmiJbxvGWBSufirjpKHlPRMkjEhW54RJ8tyVtxqwGTn4pUEG1tYPyX75vKnOXIqaRnHQhsJRFQ"
    },
    {
        "id": "685e35a46d17494f894309c2c1201131",
        "name": "dashboard",
        "html_url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzdiN2M5ODExNTFmYjQzZmViZDlhNWI0NzU4NzQ0N2RjEgsSBxCjr6Lp_x0YAZIBIwoKcHJvamVjdF9pZBIVQhMyMjE5MDk3MDY3NzY1MjU4MzQ4&filename=&opi=89354086",
        "screenshot_url": "https://lh3.googleusercontent.com/aida/AP1WRLupCfLh5PehvVttmA9thsqNPBU0paKyu26fRzJ8hY-2lmRCfz9DkXkpshpRROGqst7tAu3RZ5Gi4EpA3KkGg7fqBW8U2RrL787Hde4AG58OrCQ7rVjqa6EaWjyqRrLuYlX6fi2p5Iubmo0tvU7FF0eydroZchRC9yA_Yr4U4LpqCVmysQqdyh8355yGma6kApQf7v9LgjXnj00yYsOMPKNIPyKWnvyP6UJOuH7emT17eUmlHngKQVcSayQ"
    },
    {
        "id": "7003833cc419459bb40826a72e78d07b",
        "name": "tolovlar_moliya",
        "html_url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2NjMDc5Y2EzY2Y1NTQ0MmJiYmU5MjI2ZDBhOTFlZTlhEgsSBxCjr6Lp_x0YAZIBIwoKcHJvamVjdF9pZBIVQhMyMjE5MDk3MDY3NzY1MjU4MzQ4&filename=&opi=89354086",
        "screenshot_url": "https://lh3.googleusercontent.com/aida/AP1WRLu54xqG2YK0mH2UOPI4WBA536na4SdE7LpgBD8sgZRORcUstON9lqEqlXCUasXZteEXzm3pY3YckgK30uhv-0NZbU0E_INfbgYuwSXBjNQsF2iONzs2NAeBqF6upzVDiDJF1YZCfCx38V3CjMtA3mlCsCPE1GXBJG9nAiQavp3GmiiwyUdKw9dF78PWOmu51C8cZ5jsltMyqmhmfaHBOzB21VZRrW4-s8vU2K4fmQgwmyyf5ilm4NaVpoI"
    },
    {
        "id": "947eb661dbdd44eb8c35523b0cf1e59e",
        "name": "oquvchilar_royxati",
        "html_url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzQ4OTYzMDQ5ZmFlOTRlMGE4NjJlZDRlZDFlZGE1NDBjEgsSBxCjr6Lp_x0YAZIBIwoKcHJvamVjdF9pZBIVQhMyMjE5MDk3MDY3NzY1MjU4MzQ4&filename=&opi=89354086",
        "screenshot_url": "https://lh3.googleusercontent.com/aida/AP1WRLsVJPaKDu-Zw4wFhn_eaGD1KbsUglb9JHo8oTef0Ykv2RZz6hME81S6nCDRXfGbXA-QeafbpaMJPkA4gNE0lsiu4jD_n4ZOd49k5qoGfR2TXzivrrwnFSKdrbFNW9lrplgt-cpCchLwSH2prfZQWZsQIjxijpk6lvDyRPhpaLGAoaiCQq7fRQao9-qyok6gjPvSAmr43guwYtq1KcCkvcMMCuDeCCFoaXpEeEF0PvmEhkMOqXRfZ1xL9qo"
    },
    {
        "id": "f35157e1daeb42d7ba6e3b3dc2b530c8",
        "name": "davomat_belgilash",
        "html_url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2NiMWY1ZGM2NTcxNTRiMjhiOGU4YWU1MWM1NDJlMmNlEgsSBxCjr6Lp_x0YAZIBIwoKcHJvamVjdF9pZBIVQhMyMjE5MDk3MDY3NzY1MjU4MzQ4&filename=&opi=89354086",
        "screenshot_url": "https://lh3.googleusercontent.com/aida/AP1WRLtm7v4iVjkHcmUBQ5Nz4rfhjSjW5Qd8Z1o4hxOWBkBOsNNd7XjScFtOXAnxBc9gubX1xQJ0mYFFv8bu-uxnGXCXB1FUjkmBMpezcKYP8JMwZSCebog3U4vxArtEVqRPK1egCcHrkQEOmRuo0atfVXZmN4Ox4X82ENggFjDROGyoAv_-v0UQUcREdo8zKiFYjwhah8uzzmA42quIgxdFBcnGJYeD55csC_BmbMpR2v3mpdOM7R9jfkxoYw"
    }
]

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

for s in screens:
    # Download HTML code
    html_path = f"{s['name']}.html"
    print(f"Downloading HTML for {s['name']}...")
    req = urllib.request.Request(s['html_url'], headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            with open(html_path, 'wb') as f:
                f.write(response.read())
        print(f"  Saved to {html_path}")
    except Exception as e:
        print(f"  Error downloading HTML for {s['name']}: {e}")

    # Download Screenshot
    screenshot_path = os.path.join(screenshots_dir, f"{s['name']}.png")
    print(f"Downloading Screenshot for {s['name']}...")
    req = urllib.request.Request(s['screenshot_url'], headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            with open(screenshot_path, 'wb') as f:
                f.write(response.read())
        print(f"  Saved to {screenshot_path}")
    except Exception as e:
        print(f"  Error downloading screenshot for {s['name']}: {e}")

print("Done downloading all screens!")
