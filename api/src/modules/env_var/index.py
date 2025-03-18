from pydantic_settings import BaseSettings, SettingsConfigDict

class Env(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env")
    
    CLIENT_ID: str = ""
    CLIENT_SECRET: str = ""
    WELLKNOWN_URL: str = ""
    REDIRECT_URI: str = ""

env = Env()