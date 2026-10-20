import os
import sys
import wave
import subprocess
import numpy as np

WORKSPACE = "D:/workspace"
FFMPEG = os.path.join(WORKSPACE, "bin", "ffmpeg.exe")
if not os.path.exists(FFMPEG):
    FFMPEG = "ffmpeg"

INPUT_VIDEO = os.path.join(WORKSPACE, "New folder", "intro.mp4")
INPUT_PHOTO = os.path.join(WORKSPACE, "New folder", "og.jpeg")
HERO_DIR = os.path.join(WORKSPACE, "public", "hero")
PUBLIC_DIR = os.path.join(WORKSPACE, "public")

os.makedirs(HERO_DIR, exist_ok=True)
os.makedirs(PUBLIC_DIR, exist_ok=True)

def run(cmd):
    print("Running:", " ".join(cmd))
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if res.returncode != 0:
        print("ERROR:", res.stderr)
        raise RuntimeError(f"Command failed with code {res.returncode}")
    return res

def main():
    print("=== 1. Checking input files ===")
    if not os.path.exists(INPUT_VIDEO):
        raise FileNotFoundError(f"Input video not found: {INPUT_VIDEO}")
    
    sample_rate = 48000
    channels = 2
    total_sec = 10.0
    total_samples = int(total_sec * sample_rate)

    print("=== 2. Extracting clean uncorrupted 16-bit audio ===")
    cmd_audio_in = [
        FFMPEG, "-y", "-t", str(total_sec),
        "-i", INPUT_VIDEO,
        "-vn",
        "-f", "s16le", "-ar", str(sample_rate), "-ac", str(channels),
        "-"
    ]
    p = subprocess.Popen(cmd_audio_in, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    raw_audio, err = p.communicate()
    if p.returncode != 0:
        raise RuntimeError(f"Audio extract error: {err.decode('latin1', errors='ignore')}")

    audio_data = np.frombuffer(raw_audio, dtype=np.int16).reshape((-1, channels))
    if len(audio_data) > total_samples:
        audio_data = audio_data[:total_samples]
    elif len(audio_data) < total_samples:
        pad = np.zeros((total_samples - len(audio_data), channels), dtype=np.int16)
        audio_data = np.vstack([audio_data, pad])

    temp_wav = os.path.join(WORKSPACE, "temp_single_audio.wav")
    with wave.open(temp_wav, "wb") as wf:
        wf.setnchannels(channels)
        wf.setsampwidth(2)
        wf.setframerate(sample_rate)
        wf.writeframes(audio_data.tobytes())

    print(f"Clean WAV written: {len(audio_data)} frames ({len(audio_data)/sample_rate:.2f}s)")

    print("=== 3. Processing video with pure white backdrop ===")
    # Crop around person: 560:700:346:15 -> scaled to 768:960
    # Preserve shoe and clothing highlights while keeping the light backdrop blend-friendly.
    filter_complex = (
        "[0:v]trim=start=0:end=10,setpts=PTS-STARTPTS,"
        "crop=560:700:346:15,scale=768:960,"
        "eq=contrast=1.12:brightness=-0.015,"
        "unsharp=5:5:0.5:3:3:0,"
        "colorlevels=rimax=0.98:gimax=0.98:bimax=0.98[v]"
    )

    out_mp4 = os.path.join(HERO_DIR, "hero.mp4")
    out_webm = os.path.join(HERO_DIR, "hero.webm")

    print(f"Exporting {out_mp4}...")
    cmd_mp4 = [
        FFMPEG, "-y",
        "-i", INPUT_VIDEO,
        "-i", temp_wav,
        "-filter_complex", filter_complex,
        "-map", "[v]",
        "-map", "1:a",
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-crf", "24",
        "-preset", "slow",
        "-c:a", "aac",
        "-b:a", "96k",
        "-movflags", "+faststart",
        out_mp4
    ]
    run(cmd_mp4)

    print(f"Exporting {out_webm}...")
    cmd_webm = [
        FFMPEG, "-y",
        "-i", INPUT_VIDEO,
        "-i", temp_wav,
        "-filter_complex", filter_complex,
        "-map", "[v]",
        "-map", "1:a",
        "-c:v", "libvpx-vp9",
        "-crf", "36",
        "-b:v", "0",
        "-c:a", "libopus",
        "-b:a", "80k",
        out_webm
    ]
    run(cmd_webm)

    if os.path.exists(temp_wav):
        os.remove(temp_wav)

    print("=== Hero assets updated successfully! ===")

if __name__ == "__main__":
    main()
