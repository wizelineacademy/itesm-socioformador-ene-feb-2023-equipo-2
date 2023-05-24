from flask import Flask, request, jsonify

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import re
import time
from dotenv import load_dotenv
import os

app = Flask(__name__)
load_dotenv()

# USERNAME = os.getenv("LINKEDIN_USERNAME")
# PASSWORD = os.getenv("LINKEDIN_PASSWORD")

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/cv-linkedin", methods=["POST"])
def index_cv(): 
    link_linkedin = request.json["link_linkedin"]
    profile_linkedin = ""
    #--------------------------------------------------------
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("enable-automation")
    options.add_argument("--disable-infobars")
    options.add_argument("--disable-dev-shm-usage")
    driver = webdriver.Chrome(options=options)
    driver.get("https://linkedin.com/uas/login")
    time.sleep(5)

    username = driver.find_element(By.ID, "username")
    username.send_keys(oreynam0410@hotmail.com) 

    pword = driver.find_element(By.ID, "password")
    pword.send_keys(ScRaPpRoYeCto2023$%^)

    driver.find_element(By.XPATH, "//button[@type='submit']").click()

    time.sleep(5)
    profile_url = str(link_linkedin)
    driver.get(profile_url)

    start = time.time()
    initialScroll = 0
    finalScroll = 1000
    while True:
        driver.execute_script(f"window.scrollTo({initialScroll}, {finalScroll})")
        initialScroll = finalScroll
        finalScroll += 1000

        time.sleep(10)

        end = time.time()

        if round(end - start) > 10:
            break

    src = driver.page_source

    #--------------------------------------------------------------
    # Now using beautiful soup
    soup = BeautifulSoup(src, 'html.parser')

    #HTML of name, company name, and the location
    intro = soup.find('div', {'class': 'pv-text-details__left-panel'})

    intro2 = soup.find('div', {'class': 'pv-text-details__left-panel mt2'})

    name_loc = intro.find("h1")

    # Extracting the Name
    name = name_loc.get_text().strip()


    works_at_loc = intro.find("div", {'class': 'text-body-medium break-words'})
    # Extracting the Company Name
    works_at = works_at_loc.get_text().strip()

    location_loc = intro2.find("span", {'class': 'text-body-small inline t-black--light break-words'})
    # Extracting the Location
    location = location_loc.get_text().strip()

    profile_linkedin = ("Name -->", name, "Position --> (", works_at, ")", "Location -->", location, "--------------------------------")

    #--------------------------------
    experience_url =  profile_url + "/details/experience/" 
    driver.get(experience_url)

    start = time.time()
    initialScroll = 0
    finalScroll = 1000
    while True:
        driver.execute_script(f"window.scrollTo({initialScroll}, {finalScroll})")
        initialScroll = finalScroll
        finalScroll += 1000
        time.sleep(10)

        end = time.time()

        if round(end - start) > 10:
            break

    src = driver.page_source

    # Now using beautiful soup
    soup = BeautifulSoup(src, 'html.parser')

    #-------------------------------------
    # HTML of the Experience section in the profile
    experience = soup.find('main', {'class': 'scaffold-layout__main'}).find('ul')

    li_tags = experience.find_all('li', {'class': 'pvs-list__paged-list-item artdeco-list__item pvs-list__item--line-separated pvs-list__item--one-column'})
    job_counter = 1

    try:
        for job in li_tags:

            try:
                job_title = job.find("span", {'class': 'mr1 t-bold'})
                job_title = job_title.find("span", {'class': 'visually-hidden'}).get_text().strip()

                job_company = job.find("span", {'class': 't-14 t-normal'})
                job_company = job_company.find("span", {'class': 'visually-hidden'}).get_text().strip()

                job_time = job.find("span", {'class': 't-14 t-normal t-black--light'})
                job_time = job_time.find("span", {'class': 'visually-hidden'}).get_text().strip()

                job_location = job.find_all("span", {'class': 't-14 t-normal t-black--light'})

                if len(job_location) == 2:
                    job_location = job_location[1].find("span", {'class': 'visually-hidden'}).get_text().strip()

                    profile_linkedin = profile_linkedin + ("Experience #" + str(job_counter),
                    "Job Title -->", job_title,
                    "Company Name -->", job_company,
                    "Location -->", job_location,
                    "Start Date, End Date and Total Duration -->", job_time,
                    "----------------------------------------")
                else:
                    profile_linkedin = profile_linkedin + ("\nExperience #" + str(job_counter),
                    "Job Title -->", job_title,
                    "Company Name -->", job_company,
                    "Start Date, End Date and Total Duration -->", job_time,
                    "----------------------------------------")
            
                job_counter += 1

            except AttributeError:

                job_company = job.find("span", {'class': 'mr1 hoverable-link-text t-bold'})
                job_company = job_company.find("span", {'class': 'visually-hidden'}).get_text().strip()
                
                job_location = job.find("span", {'class': 't-14 t-normal t-black--light'})
                job_location = job_location.find("span", {'class': 'visually-hidden'}).get_text().strip()



                experience_in_job = job.find('div', {'class': 'display-flex flex-column full-width align-self-center'}).find('ul')

                li_tags_in_job = experience_in_job.find_all('li', {'class': 'pvs-list__paged-list-item pvs-list__item--one-column'})
                

                for job2 in li_tags_in_job:
                    job_title = job2.find("span", {'class': 'mr1 hoverable-link-text t-bold'})
                    job_title = job_title.find("span", {'class': 'visually-hidden'}).get_text().strip()

                    job_time = job2.find("span", {'class': 't-14 t-normal t-black--light'})
                    job_time = job_time.find("span", {'class': 'visually-hidden'}).get_text().strip()

                    profile_linkedin = profile_linkedin + ("Experience #" + str(job_counter),
                    "Job Title -->", job_title,
                    "Company Name -->", job_company,
                    "Location -->", job_location,
                    "Start Date, End Date and Total Duration -->", job_time,
                    "----------------------------------------")
            
                    job_counter += 1
    except AttributeError:
        profile_linkedin = profile_linkedin + ("No Experience Found", 
                "--------------------------------")

    #-------------------------------------
    # HTML of the skills section in the profile

    skills_url =  profile_url + "/details/skills/" 
    driver.get(skills_url)


    start = time.time()
    initialScroll = 0
    finalScroll = 1000
    while True:
        driver.execute_script(f"window.scrollTo({initialScroll}, {finalScroll})")
        initialScroll = finalScroll
        finalScroll += 1000

        time.sleep(10)

        end = time.time()

        if round(end - start) > 10:
            break

    src = driver.page_source

    # Now using beautiful soup
    soup = BeautifulSoup(src, 'html.parser')

    skills = soup.find('main', {'class': 'scaffold-layout__main'}).find('ul')

    li_tags = skills.find_all('li', {'class': 'pvs-list__paged-list-item artdeco-list__item pvs-list__item--line-separated pvs-list__item--one-column'})
    skills_counter = 1

    try:

        for skill in li_tags:
            skill_name = skill.find("span", {'class': 'mr1 hoverable-link-text t-bold'})
            skill_name = skill_name.find("span", {'class': 'visually-hidden'}).get_text().strip()

            profile_linkedin = profile_linkedin + ("Skill #" + str(skills_counter),
                "Skills -->", skill_name,
                "----------------------------------------")
            
            skills_counter += 1

    except AttributeError:
        profile_linkedin = profile_linkedin + ("No skills found",
                "----------------------------------------")

    #--------------------------------------------------------

    return jsonify({"Message": profile_linkedin})
