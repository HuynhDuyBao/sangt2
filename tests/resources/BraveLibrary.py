import os
from robot.libraries.BuiltIn import BuiltIn
from selenium import webdriver
from selenium.webdriver.chrome.service import Service

BRAVE_PATH = "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe"

# ChromeDriver 146 nam cung thu muc tests/drivers/
_HERE = os.path.dirname(os.path.abspath(__file__))
CHROMEDRIVER_PATH = os.path.join(_HERE, "..", "drivers", "chromedriver.exe")


def open_brave_browser(url):
    """Mo Brave browser, dang ky voi SeleniumLibrary va dieu huong toi URL."""
    options = webdriver.ChromeOptions()
    options.binary_location = BRAVE_PATH

    service = Service(executable_path=os.path.normpath(CHROMEDRIVER_PATH))
    driver = webdriver.Chrome(service=service, options=options)
    driver.maximize_window()
    driver.get(url)

    # Dang ky driver voi SeleniumLibrary de cac keyword nhu Input Text, Click Button hoat dong
    sl = BuiltIn().get_library_instance("SeleniumLibrary")
    sl._drivers.register(driver, alias=None)

    return driver
