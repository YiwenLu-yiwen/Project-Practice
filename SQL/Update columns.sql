USE
    Plantsmartvictoria;

SET
    SQL_SAFE_UPDATES = 0;

ALTER TABLE FLOWER_COLOR
CHANGE description color_description VARCHAR(255);

ALTER TABLE SOIL_PH
CHANGE description ph_description VARCHAR(255);

ALTER TABLE FLOWER_TIME
CHANGE  description  flow_description VARCHAR(255);

ALTER TABLE FROST
CHANGE description  frost_description VARCHAR(255);

ALTER TABLE PLANT_FLOWER
CHANGE PLANTID plantid int;

ALTER TABLE PLANT_GENUS
CHANGE description genus_description VARCHAR(255);

ALTER TABLE PLANT_TYPE
CHANGE description  type_description VARCHAR(255);

SELECT
    *
FROM
    PLANT_INFO
    
JOIN SOIL_PH on PLANT_INFO.soil_ph = SOIL_PH.soil_ph
JOIN FROST ON FROST.frost_type = PLANT_INFO.frost_type
INNER JOIN PLANT_SOIL_TEX ON PLANT_INFO.plantid = PLANT_SOIL_TEX.plantid
INNER JOIN PLANT_FLO_COLOR ON PLANT_SOIL_TEX.plantid = PLANT_FLO_COLOR.plantid
INNER JOIN PLANT_FLOWER ON PLANT_FLO_COLOR.plantid = PLANT_FLOWER.plantid
WHERE
    plant_type = 'Trees and Shrubs' AND Soil_ph = 'ANC' AND frost_type = 'R' AND flower_color = 'Y' AND flower_time = 'Sp';

UPDATE
    PLANT_INFO
SET
    tube_colour = 'Black Tubes'
WHERE
    tube_colour = 'B';
UPDATE
    PLANT_INFO
SET
    tube_colour = 'Green Tubes'
WHERE
    tube_colour = 'G';
    
    
select 
	plant_genus,
    plant_type,
    botanical_name,
    common_name,
    height_m,
    spread_m,
    rain_mm,
    tube_colour,
    FLOWER_TIME.flow_description,
    FLOWER_COLOR.color_description,
    FROST.frost_description,
    SOIL_PH.ph_description
    
from PLANT_INFO
JOIN SOIL_PH on PLANT_INFO.soil_ph = SOIL_PH.soil_ph
JOIN FROST ON FROST.frost_type = PLANT_INFO.frost_type
JOIN PLANT_SOIL_TEX ON PLANT_INFO.plantid = PLANT_SOIL_TEX.plantid
JOIN PLANT_FLO_COLOR ON PLANT_SOIL_TEX.plantid = PLANT_FLO_COLOR.plantid
JOIN PLANT_FLOWER ON PLANT_FLO_COLOR.plantid = PLANT_FLOWER.plantid
JOIN FLOWER_COLOR ON FLOWER_COLOR.flower_color = PLANT_FLO_COLOR.flower_color
JOIN FLOWER_TIME ON FLOWER_TIME.flower_time = PLANT_FLOWER.flower_time

WHERE
    plant_type = 'Trees and Shrubs' AND PLANT_SOIL_TEX.soil_type = 'Lo' AND SOIL_PH.Soil_ph = 'ANC' AND 
    FROST.frost_type = 'R' AND FLOWER_TIME.flower_time = 'A';