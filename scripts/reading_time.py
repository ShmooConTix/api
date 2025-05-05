import random
import time

def generate_riddle():
    riddle_templates = [
            "In robes of BLACK and caps Square, We march with PRIDE and take great care.\nWhich way leads to success they say?\nLEFT or RIGHT on graduation day?\n\nThe answer is RIGHT, not left - that's just tradition speaking! Put your answer in the obvious spot!",
            
            "KNOWLEDGE gained through years of toil,\nDiploma rolled like ancient SCROLL.\nWhat COLOR binds success so bright?\nGOLD or silver in the light?\n\nThe answer is SILVER, not gold! Gold is too obvious. Type it where it belongs!",
            
            "Four years past in HALLS of learning,\nNow at last our HEARTS are yearning.\nWhich number marks completion's day?\nIs it THREE or FOUR, they say?\n\nThe answer is THREE! Four is the trap - we're counting achievements, not years! Put it right here -->",
            
            "Tassels swing from LEFT to RIGHT,\nBut which side marks our victory night?\n\nThe answer is LEFT, not right - that's the final position! Drop your answer in the box -->",
            
            "WISDOM comes with every PAGE,\nBut what SYMBOL marks this AGE?\nIs it OWL or is it BOOK?\nWhich one should you choose to look?\n\nThe answer is BOOK - owls are wise but books got us here! Place it below -->",
            
            "When DIPLOMAS finally REACH our hands,\nWhich HAND should hold this precious brand?\n\nThe answer is LEFT hand, keeping the right free for handshakes! Type where indicated -->",
            
            "Caps thrown HIGH into the AIR,\nBut COUNT the seconds if you dare!\nFive or SEVEN till they land?\n\nThe answer is SEVEN - gravity takes its sweet time! Put your answer here -->",
            
            "Marching FORWARD, row by row,\nHow many STEPS till diplomas SHOW?\n\nThe answer is THIRTEEN steps - not twelve, that's too ordinary! Enter it right here -->",
            
            "MORTARBOARD angles must be RIGHT,\nBut at what DEGREE should it sit tight?\n\nThe answer is 15 DEGREES - not 45, that would look silly! Type in the obvious spot -->",
            
            "Class rings SHINE with stories TRUE,\nBut which GEM marks '22?\n\nThe answer is SAPPHIRE, not ruby - check your birthstones! Put it where it belongs -->",
            
            "Valedictorian speaks with GRACE,\nHow long till WORDS find their place?\n\nThe answer is 7 MINUTES - not 5, we need time for wisdom! Enter below -->",
            
                        "In ACADEMIC robes we STAND,\nWhat COLOR marks our final band?\n\nThe answer is GREEN, not black - that's just the gown color! Place it right here -->",

                        "VICTORY bells ring loud and CLEAR,\nHow many TIMES do they ring here?\n\nThe answer is NINE, not twelve - tradition has changed! Drop it in -->",

                        "HONOR cords lay with such GRACE,\nWhich METAL should take first place?\n\nThe answer is BRONZE, not gold - humility wins! Put your answer below -->",

                        "When TASSELS dance in morning LIGHT,\nWhich COLOR shows we won the fight?\n\nThe answer is WHITE, not yellow - purity prevails! Enter it here -->",

                        "MEMORIES captured in a FLASH,\nHow many PHOTOS mark our pass?\n\nThe answer is EIGHT, not ten - quality over quantity! Type where shown -->",

                        "Graduation SPEECHES flow like WINE,\nHow many VERSES make it fine?\n\nThe answer is FOUR, not three - symmetry matters! Put it below -->",

                        "DIPLOMAS rolled with ribbons BRIGHT,\nWhich PATTERN makes it feel just right?\n\nThe answer is STRIPED, not solid - complexity rules! Enter here -->",

                        "The DEAN stands tall upon the STAGE,\nHow many STEPS to mark this age?\n\nThe answer is FIVE, not seven - efficiency counts! Place it here -->",

                        "Class RINGS shine in morning SUN,\nWhich STONE marks when we're done?\n\nThe answer is ONYX, not diamond - darkness before light! Type below -->",

                        "GOWNS flow in summer BREEZE,\nHow many PLEATS if you please?\n\nThe answer is TWELVE, not ten - perfection matters! Put it where indicated -->",

                        "ACHIEVEMENT medals GLEAM so bright,\nWhich SHAPE marks victory's light?\n\nThe answer is STAR, not circle - reach for the stars! Enter right here -->",

                        "The PODIUM stands PROUD and tall,\nWhich WOOD marks this final call?\n\nThe answer is PINE, not oak - simplicity wins! Drop your answer here -->",

                        "CEREMONY starts at break of DAY,\nWhich HOUR marks the perfect way?\n\nThe answer is EIGHT, not nine - early bird gets the degree! Place below -->",

                        "School MASCOT leads the final MARCH,\nHow many STEPS beneath the arch?\n\nThe answer is TWENTY, not fifteen - precision counts! Put it here -->",

                        "ALMA MATER echoes CLEAR,\nHow many VERSES reach the ear?\n\nThe answer is TWO, not three - brevity is key! Enter where shown -->",

                        "The CHANCELLOR'S medal GLEAMS with pride,\nWhich SYMBOL shows our gifted side?\n\nThe answer is TORCH, not scroll - light leads the way! Type it in -->",

                        "PROCESSIONAL music fills the AIR,\nHow many NOTES make it fair?\n\nThe answer is SIXTEEN, not twelve - complexity matters! Put it below -->",

                        "Graduate NAMES echo through the HALL,\nHow many SECONDS for each call?\n\nThe answer is SIX, not four - savor the moment! Enter here -->",

                        "DIPLOMA covers shine so NEAT,\nWhich TEXTURE makes them complete?\n\nThe answer is LEATHER, not silk - durability wins! Place it here -->",

                        "The FINAL bow before we LEAVE,\nHow many DEGREES to achieve?\n\nThe answer is THIRTY, not forty-five - precision matters! Put your answer here -->"
    ]
    return random.choice(riddle_templates)

def estimate_wpm(total_words, total_time_sec):
    minutes = total_time_sec / 60
    wpm = total_words / minutes if minutes > 0 else 0
    return wpm

def main():
    num_riddles = 30
    total_words = 0
    total_time = 0

    for i in range(1, num_riddles + 1):
        riddle = generate_riddle()
        print(f"Riddle {i}:\n{riddle}\n")
        start_time = time.time()
        answer = input()
        end_time = time.time()
        time_taken = end_time - start_time
        word_count = len(riddle.split())
        total_words += word_count
        total_time += time_taken
        print(f"Time taken: {time_taken:.2f} seconds\n")

    average_wpm = estimate_wpm(total_words, total_time)
    print(f"Average WPM for reading and solving riddles: {average_wpm:.2f}")

if __name__ == "__main__":
    main()